#!/usr/bin/env python3
"""Point the deployed card's Lovelace resource at the freshly-built hashed JS.

The rollup deploy plugin emits two files alongside each other:
  <name>.js               ← stable filename HACS validates against
  <name>.<hash>.js        ← content-hashed sibling produced this build

It also writes the hash to dist/.deploy-hash. We read that, then rewrite the
Lovelace resource URL to /hacsfiles/<dir>/<name>.<hash>.js. Because the URL
itself changes whenever the source changes, browser HTTP cache, HA service
worker, and Lovelace's client-side resource list cannot serve a stale copy.

Falls back to bumping a ?hacstag= query if .deploy-hash is missing so the
script still works for projects on the old deploy pipeline.

Reads HA_URL and HA_TOKEN from <repo>/../.env. Override the resource match
with --name foo or RESOURCE_NAME=foo.

This lives in Python instead of Node because macOS Application Firewall
appears to block Node-from-homebrew outbound TCP to LAN hosts on this box,
while Python connects fine.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys
import time
from pathlib import Path

import websockets

REPO_ROOT = Path(__file__).resolve().parent.parent
ENV_PATH = REPO_ROOT.parent / ".env"


def load_env(path: Path) -> dict[str, str]:
    env: dict[str, str] = {}
    for raw in path.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        key, _, value = line.partition("=")
        env[key.strip()] = value.strip()
    return env


async def call(ws, msg_id: int, type_: str, **payload):
    await ws.send(json.dumps({"id": msg_id, "type": type_, **payload}))
    while True:
        msg = json.loads(await ws.recv())
        if msg.get("id") != msg_id:
            continue
        if msg.get("success"):
            return msg.get("result")
        raise RuntimeError(f"{type_} failed: {msg.get('error', {}).get('message', msg)}")


def read_deploy_hash() -> str | None:
    hash_path = REPO_ROOT / "dist" / ".deploy-hash"
    if not hash_path.exists():
        return None
    h = hash_path.read_text().strip()
    return h or None


def build_hashed_url(current_url: str, name: str, deploy_hash: str) -> str:
    """Rewrite the resource URL so its filename ends in .<hash>.js.

    Idempotent: strips any existing hash suffix before applying the new one,
    and drops any ?hacstag query so the URL becomes one stable cache key.
    """
    path = current_url.split("?", 1)[0]
    directory, _, filename = path.rpartition("/")
    # Strip trailing ".js" plus any ".<hash>" segment between name and ".js".
    if filename.endswith(".js"):
        stem = filename[:-3]
        if stem.startswith(f"{name}."):
            # name.<hash> → name
            stem = name
        elif stem != name:
            # Unexpected layout — keep the stem as-is rather than guessing.
            pass
        else:
            stem = name
    else:
        stem = name
    new_filename = f"{stem}.{deploy_hash}.js"
    return f"{directory}/{new_filename}" if directory else new_filename


async def bump(ha_url: str, token: str, resource_name: str) -> None:
    ws_url = ha_url.replace("http://", "ws://", 1).replace("https://", "wss://", 1) + "/api/websocket"
    async with websockets.connect(ws_url) as ws:
        first = json.loads(await ws.recv())
        if first.get("type") != "auth_required":
            raise RuntimeError(f"Expected auth_required, got {first}")
        await ws.send(json.dumps({"type": "auth", "access_token": token}))
        auth = json.loads(await ws.recv())
        if auth.get("type") != "auth_ok":
            raise RuntimeError(f"Auth failed: {auth.get('message', auth)}")

        resources = await call(ws, 1, "lovelace/resources")
        target = next((r for r in resources if resource_name in r["url"]), None)
        if target is None:
            print(f"[bump] no Lovelace resource found matching {resource_name!r}", file=sys.stderr)
            print("Available resources:", file=sys.stderr)
            for r in resources:
                print(f"  {r['url']}", file=sys.stderr)
            sys.exit(1)

        deploy_hash = read_deploy_hash()
        if deploy_hash:
            new_url = build_hashed_url(target["url"], resource_name, deploy_hash)
        else:
            # Fallback for projects/builds that didn't produce a hashed file.
            base_url = target["url"].split("?", 1)[0]
            new_url = f"{base_url}?hacstag={int(time.time() * 1000)}"

        if new_url == target["url"]:
            print(f"[bump] resource URL already current: {new_url}")
            return

        await call(
            ws,
            2,
            "lovelace/resources/update",
            resource_id=target["id"],
            res_type=target["type"],
            url=new_url,
        )

        print(f"[bump] {target['url']}")
        print(f"[bump]   -> {new_url}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Bump Lovelace resource hacstag")
    parser.add_argument(
        "--name",
        default=os.environ.get("RESOURCE_NAME", "status-button-card"),
        help="Substring of the resource URL to match (default: status-button-card)",
    )
    args = parser.parse_args()

    env = load_env(ENV_PATH)
    ha_url = env.get("HA_URL")
    token = env.get("HA_TOKEN")
    if not ha_url or not token:
        sys.exit(f"HA_URL and HA_TOKEN must be set in {ENV_PATH}")

    asyncio.run(bump(ha_url, token, args.name))


if __name__ == "__main__":
    main()
