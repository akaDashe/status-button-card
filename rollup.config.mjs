import { copyFile, mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { basename, dirname, join } from "node:path";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const dev = process.env.ROLLUP_WATCH;
const deployPath =
  process.env.HA_DEPLOY_PATH ||
  "/Volumes/config/www/community/status-button-card/status-button-card.js";
const shouldDeploy = process.env.DEPLOY === "1";

// Deploy strategy: write two files into the deploy dir.
//   1. <name>.js              ← canonical, kept stable for HACS validation
//   2. <name>.<hash>.js       ← content-hashed; Lovelace resource URL points here
// The hashed filename guarantees a brand-new URL on any source change, which
// bypasses browser cache, HA service worker, and the Lovelace resource list
// entirely. Old hashed siblings are pruned on each deploy. bump-resource.py
// reads dist/.deploy-hash to know which file to point the resource at.
const deployPlugin = () => ({
  name: "deploy-to-ha",
  async writeBundle(_options, bundle) {
    const file = Object.keys(bundle).find((f) => f.endsWith(".js"));
    if (!file) return;
    const src = `dist/${file}`;
    try {
      const content = await readFile(src);
      const hash = createHash("sha256").update(content).digest("hex").slice(0, 12);

      const dir = dirname(deployPath);
      const base = basename(deployPath, ".js");
      const hashedPath = join(dir, `${base}.${hash}.js`);

      await mkdir(dir, { recursive: true });
      await copyFile(src, deployPath);
      await copyFile(src, hashedPath);
      await writeFile("dist/.deploy-hash", hash, "utf8");

      // Prune old hashed siblings — keep the canonical .js and the current hash.
      const prefix = `${base}.`;
      const keep = new Set([basename(deployPath), basename(hashedPath)]);
      const entries = await readdir(dir);
      const stale = entries.filter(
        (n) => n.startsWith(prefix) && n.endsWith(".js") && !keep.has(n),
      );
      await Promise.all(
        stale.map(async (n) => {
          try {
            await unlink(join(dir, n));
          } catch (_) {
            /* tolerate missing */
          }
        }),
      );

      console.log(`[deploy] ${src} → ${deployPath}`);
      console.log(`[deploy] ${src} → ${hashedPath}`);
      if (stale.length) console.log(`[deploy] pruned: ${stale.join(", ")}`);
    } catch (err) {
      console.error(`[deploy] failed: ${err.message}`);
    }
  },
});

export default {
  input: "src/status-button-card.ts",
  output: {
    file: "dist/status-button-card.js",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    typescript(),
    !dev && terser({ format: { comments: false } }),
    shouldDeploy && deployPlugin(),
  ],
};
