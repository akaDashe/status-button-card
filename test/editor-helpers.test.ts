import { describe, it, expect } from "vitest";
import {
  COLOR_DEFAULT_SENTINEL,
  COLOR_SELECT_OPTIONS,
  DOMAIN_KNOWN_STATES,
  buildStateOptions,
  colorFromFormValue,
  colorToFormValue,
  reorderList,
  statesForEntity,
} from "../src/editor-helpers";
import type { HomeAssistant } from "../src/types";

function fakeHass(states: Record<string, { state?: string; attributes?: Record<string, any> }>) {
  // Only the slice the helpers actually touch — keep test fixtures minimal.
  return {
    states: Object.fromEntries(
      Object.entries(states).map(([id, s]) => [
        id,
        {
          entity_id: id,
          state: s.state ?? "unknown",
          attributes: s.attributes ?? {},
          last_changed: "",
          last_updated: "",
        },
      ]),
    ),
  } as unknown as HomeAssistant;
}

describe("color form-value round-trip", () => {
  it("treats empty string as the default sentinel", () => {
    expect(colorToFormValue("")).toBe(COLOR_DEFAULT_SENTINEL);
    expect(colorToFormValue(undefined)).toBe(COLOR_DEFAULT_SENTINEL);
  });

  it("passes through real color values unchanged", () => {
    expect(colorToFormValue("rgba(46, 175, 80, 0.9)")).toBe("rgba(46, 175, 80, 0.9)");
  });

  it("maps the sentinel back to undefined", () => {
    expect(colorFromFormValue(COLOR_DEFAULT_SENTINEL)).toBeUndefined();
    expect(colorFromFormValue("")).toBeUndefined();
    expect(colorFromFormValue(undefined)).toBeUndefined();
  });

  it("preserves a real color value from the form", () => {
    expect(colorFromFormValue("rgba(46, 175, 80, 0.9)")).toBe("rgba(46, 175, 80, 0.9)");
  });

  it("COLOR_SELECT_OPTIONS replaces empty values with the sentinel", () => {
    const def = COLOR_SELECT_OPTIONS.find((o) => o.label === "Default");
    expect(def).toBeDefined();
    expect(def!.value).toBe(COLOR_DEFAULT_SENTINEL);
    // Non-default options keep their real values.
    const named = COLOR_SELECT_OPTIONS.filter((o) => o.label !== "Default");
    for (const o of named) {
      expect(o.value).not.toBe("");
      expect(o.value).not.toBe(COLOR_DEFAULT_SENTINEL);
    }
  });
});

describe("statesForEntity", () => {
  it("returns empty when no entity given", () => {
    expect(statesForEntity(undefined, undefined)).toEqual([]);
    expect(statesForEntity(undefined, "")).toEqual([]);
  });

  it("returns the domain's known states for a lock", () => {
    const out = statesForEntity(undefined, "lock.front_door");
    expect(out).toEqual(expect.arrayContaining(["locked", "unlocked", "locking", "unlocking"]));
  });

  it("falls back to unavailable/unknown for an unrecognised domain", () => {
    const out = statesForEntity(undefined, "weirddomain.thing");
    expect(out).toEqual(["unavailable", "unknown"]);
  });

  it("merges the entity's current live state into the option list when novel", () => {
    const hass = fakeHass({
      "sensor.temperature": { state: "21.5" },
    });
    const out = statesForEntity(hass, "sensor.temperature");
    // Sensor's known states are just unavailable/unknown, but the live state
    // should still surface so users can match against it.
    expect(out).toEqual(expect.arrayContaining(["21.5", "unavailable", "unknown"]));
  });

  it("does not duplicate states already in the known list", () => {
    const hass = fakeHass({
      "lock.front_door": { state: "locked" },
    });
    const out = statesForEntity(hass, "lock.front_door");
    expect(out.filter((s) => s === "locked")).toHaveLength(1);
  });

  it("merges select-entity `options` attribute", () => {
    const hass = fakeHass({
      "select.fan_mode": {
        state: "auto",
        attributes: { options: ["auto", "low", "medium", "high"] },
      },
    });
    const out = statesForEntity(hass, "select.fan_mode");
    expect(out).toEqual(expect.arrayContaining(["auto", "low", "medium", "high"]));
  });
});

describe("buildStateOptions", () => {
  it("returns empty when neither entity is configured", () => {
    expect(buildStateOptions(undefined, undefined, undefined)).toEqual([]);
  });

  it("lists primary states with their bare values as labels", () => {
    const out = buildStateOptions(undefined, "light.kitchen", undefined);
    expect(out).toEqual(expect.arrayContaining([{ value: "on", label: "on" }]));
    expect(out.every((o) => !o.value.startsWith("secondary:"))).toBe(true);
  });

  it("prefixes secondary entity states with `secondary:`", () => {
    const out = buildStateOptions(undefined, undefined, "binary_sensor.door");
    expect(out).toEqual(
      expect.arrayContaining([{ value: "secondary:on", label: "secondary: on" }]),
    );
    expect(out.every((o) => o.value.startsWith("secondary:"))).toBe(true);
  });

  it("combines both lists when both entities are set", () => {
    const out = buildStateOptions(undefined, "lock.front_door", "binary_sensor.contact");
    const primaryLocked = out.find((o) => o.value === "locked");
    const secondaryOn = out.find((o) => o.value === "secondary:on");
    expect(primaryLocked).toBeDefined();
    expect(secondaryOn).toBeDefined();
    expect(secondaryOn!.label).toBe("secondary: on");
  });

  it("preserves primary-then-secondary ordering", () => {
    const out = buildStateOptions(undefined, "light.kitchen", "binary_sensor.door");
    const firstSecondary = out.findIndex((o) => o.value.startsWith("secondary:"));
    const lastPrimary = out.findLastIndex
      ? out.findLastIndex((o) => !o.value.startsWith("secondary:"))
      : out
          .map((o, i) => (o.value.startsWith("secondary:") ? -1 : i))
          .reduce((a, b) => Math.max(a, b), -1);
    expect(lastPrimary).toBeLessThan(firstSecondary);
  });
});

describe("DOMAIN_KNOWN_STATES coverage", () => {
  it("covers domains the editor commonly targets", () => {
    const expected = [
      "light",
      "switch",
      "fan",
      "lock",
      "cover",
      "climate",
      "media_player",
      "alarm_control_panel",
      "binary_sensor",
      "person",
      "device_tracker",
      "vacuum",
      "camera",
    ];
    for (const d of expected) {
      expect(DOMAIN_KNOWN_STATES[d]).toBeDefined();
      expect(DOMAIN_KNOWN_STATES[d].length).toBeGreaterThan(1);
      expect(DOMAIN_KNOWN_STATES[d]).toContain("unavailable");
      expect(DOMAIN_KNOWN_STATES[d]).toContain("unknown");
    }
  });

  it("lock has all locking/unlocking transitional states", () => {
    expect(DOMAIN_KNOWN_STATES.lock).toEqual(
      expect.arrayContaining(["locked", "unlocked", "locking", "unlocking", "jammed"]),
    );
  });

  it("alarm panel covers every armed_* state", () => {
    expect(DOMAIN_KNOWN_STATES.alarm_control_panel).toEqual(
      expect.arrayContaining([
        "armed_home",
        "armed_away",
        "armed_night",
        "armed_vacation",
        "armed_custom_bypass",
      ]),
    );
  });
});

describe("reorderList", () => {
  it("moves an item forward (down)", () => {
    expect(reorderList(["a", "b", "c", "d"], 0, 3)).toEqual(["b", "c", "a", "d"]);
  });

  it("moves an item backward (up)", () => {
    expect(reorderList(["a", "b", "c", "d"], 3, 1)).toEqual(["a", "d", "b", "c"]);
  });

  it("moves an item to the end when target === list.length", () => {
    expect(reorderList(["a", "b", "c"], 0, 3)).toEqual(["b", "c", "a"]);
  });

  it("moves an item to the start when target === 0", () => {
    expect(reorderList(["a", "b", "c"], 2, 0)).toEqual(["c", "a", "b"]);
  });

  it("is a no-op when dropped on its own position", () => {
    const list = ["a", "b", "c"];
    const out = reorderList(list, 1, 1);
    expect(out).toEqual(list);
  });

  it("is a no-op when dropped just after its own position (same slot)", () => {
    const list = ["a", "b", "c"];
    // from=1, target=2 means "insert before index 2" — that's the slot it
    // already occupies, so the list should be unchanged.
    const out = reorderList(list, 1, 2);
    expect(out).toEqual(list);
  });

  it("returns a copy — never mutates the input", () => {
    const list = ["a", "b", "c"];
    const out = reorderList(list, 0, 2);
    expect(out).not.toBe(list);
    expect(list).toEqual(["a", "b", "c"]);
  });

  it("clamps `to` past the end", () => {
    expect(reorderList(["a", "b", "c"], 0, 99)).toEqual(["b", "c", "a"]);
  });

  it("clamps negative `to` to 0", () => {
    expect(reorderList(["a", "b", "c"], 2, -5)).toEqual(["c", "a", "b"]);
  });

  it("returns a copy when `from` is out of bounds", () => {
    const list = ["a", "b", "c"];
    expect(reorderList(list, 5, 0)).toEqual(list);
    expect(reorderList(list, -1, 0)).toEqual(list);
  });

  it("handles a swap of two adjacent items in a 2-element list", () => {
    expect(reorderList(["a", "b"], 0, 2)).toEqual(["b", "a"]);
    expect(reorderList(["a", "b"], 1, 0)).toEqual(["b", "a"]);
  });
});
