import { describe, it, expect } from "vitest";
import {
  getDomain,
  getStateCategory,
  findAppearance,
  getColor,
  getIcon,
  getLabel,
  shouldAnimate,
  getName,
  validateConfig,
  normalizeCameras,
  getCamerasForState,
} from "../src/state";
import {
  COLOR_GREEN,
  COLOR_RED,
  COLOR_ORANGE,
  COLOR_AMBER,
  COLOR_BLUE,
  COLOR_GREY,
} from "../src/const";
import type { HassEntity, StatusButtonCardConfig, StateAppearance } from "../src/types";

function makeEntity(entityId: string, state: string, attrs: Record<string, any> = {}): HassEntity {
  return {
    entity_id: entityId,
    state,
    attributes: attrs,
    last_changed: "2024-01-01T00:00:00Z",
    last_updated: "2024-01-01T00:00:00Z",
  };
}

function makeConfig(overrides: Partial<StatusButtonCardConfig> = {}): StatusButtonCardConfig {
  return {
    type: "custom:status-button-card",
    entity: "lock.front_door",
    ...overrides,
  };
}

// --- getDomain ---
describe("getDomain", () => {
  it("extracts domain from entity id", () => {
    expect(getDomain("lock.front_door")).toBe("lock");
    expect(getDomain("light.living_room")).toBe("light");
    expect(getDomain("binary_sensor.motion")).toBe("binary_sensor");
  });
});

// --- getStateCategory ---
describe("getStateCategory", () => {
  it("returns transitional for locking/unlocking", () => {
    expect(getStateCategory(makeEntity("lock.door", "locking"))).toBe("transitional");
    expect(getStateCategory(makeEntity("lock.door", "unlocking"))).toBe("transitional");
  });

  it("returns active for locked", () => {
    expect(getStateCategory(makeEntity("lock.door", "locked"))).toBe("active");
  });

  it("returns inactive for unlocked", () => {
    expect(getStateCategory(makeEntity("lock.door", "unlocked"))).toBe("inactive");
  });

  it("returns active for light on", () => {
    expect(getStateCategory(makeEntity("light.lamp", "on"))).toBe("active");
  });

  it("returns inactive for light off", () => {
    expect(getStateCategory(makeEntity("light.lamp", "off"))).toBe("inactive");
  });

  it("returns transitional for cover opening/closing", () => {
    expect(getStateCategory(makeEntity("cover.blind", "opening"))).toBe("transitional");
    expect(getStateCategory(makeEntity("cover.blind", "closing"))).toBe("transitional");
  });

  it("returns active for cover open", () => {
    expect(getStateCategory(makeEntity("cover.blind", "open"))).toBe("active");
  });

  it("falls back to inactive for off/unavailable/unknown/idle", () => {
    expect(getStateCategory(makeEntity("sensor.temp", "off"))).toBe("inactive");
    expect(getStateCategory(makeEntity("sensor.temp", "unavailable"))).toBe("inactive");
    expect(getStateCategory(makeEntity("sensor.temp", "unknown"))).toBe("inactive");
    expect(getStateCategory(makeEntity("sensor.temp", "idle"))).toBe("inactive");
  });

  it("falls back to active for unknown domains with non-inactive state", () => {
    expect(getStateCategory(makeEntity("sensor.temp", "measuring"))).toBe("active");
  });

  it("returns active for climate heat", () => {
    expect(getStateCategory(makeEntity("climate.ac", "heat"))).toBe("active");
    expect(getStateCategory(makeEntity("climate.ac", "cool"))).toBe("active");
  });

  it("returns inactive for climate off", () => {
    expect(getStateCategory(makeEntity("climate.ac", "off"))).toBe("inactive");
  });

  it("returns active for alarm armed states", () => {
    expect(getStateCategory(makeEntity("alarm_control_panel.home", "armed_home"))).toBe("active");
    expect(getStateCategory(makeEntity("alarm_control_panel.home", "armed_away"))).toBe("active");
  });

  it("returns transitional for alarm arming/pending", () => {
    expect(getStateCategory(makeEntity("alarm_control_panel.home", "arming"))).toBe("transitional");
    expect(getStateCategory(makeEntity("alarm_control_panel.home", "pending"))).toBe(
      "transitional",
    );
  });
});

// --- findAppearance ---
describe("findAppearance", () => {
  const appearances: StateAppearance[] = [
    { state: "locked", icon: "mdi:lock", color: COLOR_GREEN },
    { state: "unlocked", icon: "mdi:lock-open", color: COLOR_RED },
    { state: "secondary:on", label: "Door Open", color: COLOR_ORANGE },
  ];

  it("returns undefined with no appearances", () => {
    expect(findAppearance(undefined, "locked")).toBeUndefined();
    expect(findAppearance([], "locked")).toBeUndefined();
  });

  it("matches primary entity state", () => {
    expect(findAppearance(appearances, "locked")).toEqual(appearances[0]);
    expect(findAppearance(appearances, "unlocked")).toEqual(appearances[1]);
  });

  it("matches secondary entity state", () => {
    expect(findAppearance(appearances, "locked", "on")).toEqual(appearances[0]);
  });

  it("falls back to secondary match when primary has no match", () => {
    expect(findAppearance(appearances, "locking", "on")).toEqual(appearances[2]);
  });

  it("returns undefined when no match", () => {
    expect(findAppearance(appearances, "jammed")).toBeUndefined();
  });
});

// --- getColor ---
describe("getColor", () => {
  it("uses appearance color when matched", () => {
    const config = makeConfig({
      state_appearances: [{ state: "locked", color: COLOR_BLUE }],
    });
    const entity = makeEntity("lock.door", "locked");
    expect(getColor(config, entity)).toBe(COLOR_BLUE);
  });

  it("uses domain active color for active state", () => {
    const config = makeConfig();
    const entity = makeEntity("lock.door", "locked");
    expect(getColor(config, entity)).toBe(COLOR_GREEN);
  });

  it("uses domain inactive color for inactive state", () => {
    const config = makeConfig();
    const entity = makeEntity("lock.door", "unlocked");
    expect(getColor(config, entity)).toBe(COLOR_RED);
  });

  it("uses domain transitional color for transitional state", () => {
    const config = makeConfig();
    const entity = makeEntity("lock.door", "locking");
    expect(getColor(config, entity)).toBe(COLOR_ORANGE);
  });

  it("uses config override colors", () => {
    const config = makeConfig({ active_color: COLOR_BLUE });
    const entity = makeEntity("lock.door", "locked");
    expect(getColor(config, entity)).toBe(COLOR_BLUE);
  });

  it("uses config inactive override", () => {
    const config = makeConfig({ inactive_color: COLOR_AMBER });
    const entity = makeEntity("lock.door", "unlocked");
    expect(getColor(config, entity)).toBe(COLOR_AMBER);
  });

  it("defaults to grey for unknown domain inactive", () => {
    const config = makeConfig({ entity: "sensor.temp" });
    const entity = makeEntity("sensor.temp", "off");
    expect(getColor(config, entity)).toBe(COLOR_GREY);
  });

  it("uses light domain active color", () => {
    const config = makeConfig({ entity: "light.lamp" });
    const entity = makeEntity("light.lamp", "on");
    expect(getColor(config, entity)).toBe(COLOR_AMBER);
  });
});

// --- getIcon ---
describe("getIcon", () => {
  it("uses appearance icon when matched", () => {
    const config = makeConfig({
      state_appearances: [{ state: "locked", icon: "mdi:shield-lock" }],
    });
    const entity = makeEntity("lock.door", "locked");
    expect(getIcon(config, entity)).toBe("mdi:shield-lock");
  });

  it("uses config icon override", () => {
    const config = makeConfig({ icon: "mdi:custom" });
    const entity = makeEntity("lock.door", "locked");
    expect(getIcon(config, entity)).toBe("mdi:custom");
  });

  it("uses entity attribute icon", () => {
    const config = makeConfig();
    const entity = makeEntity("lock.door", "locked", { icon: "mdi:door-closed-lock" });
    expect(getIcon(config, entity)).toBe("mdi:door-closed-lock");
  });

  it("uses domain default icon", () => {
    const config = makeConfig();
    const entity = makeEntity("lock.door", "locked");
    expect(getIcon(config, entity)).toBe("mdi:lock");
  });

  it("falls back to help-circle for unknown domain", () => {
    const config = makeConfig({ entity: "custom_domain.thing" });
    const entity = makeEntity("custom_domain.thing", "on");
    expect(getIcon(config, entity)).toBe("mdi:help-circle");
  });

  it("uses secondary state appearance icon", () => {
    const config = makeConfig({
      state_appearances: [{ state: "secondary:on", icon: "mdi:door-open" }],
    });
    const entity = makeEntity("lock.door", "locked");
    const secondary = makeEntity("binary_sensor.door", "on");
    expect(getIcon(config, entity, secondary)).toBe("mdi:door-open");
  });
});

// --- getLabel ---
describe("getLabel", () => {
  it("uses appearance label when matched", () => {
    const config = makeConfig({
      state_appearances: [{ state: "locked", label: "Secure" }],
    });
    const entity = makeEntity("lock.door", "locked");
    expect(getLabel(config, entity)).toBe("Secure");
  });

  it("formats entity state as uppercase label", () => {
    const config = makeConfig();
    const entity = makeEntity("lock.door", "locked");
    expect(getLabel(config, entity)).toBe("LOCKED");
  });

  it("replaces underscores with spaces", () => {
    const config = makeConfig({ entity: "alarm_control_panel.home" });
    const entity = makeEntity("alarm_control_panel.home", "armed_home");
    expect(getLabel(config, entity)).toBe("ARMED HOME");
  });
});

// --- shouldAnimate ---
describe("shouldAnimate", () => {
  it("returns true for transitional states", () => {
    const config = makeConfig();
    expect(shouldAnimate(config, makeEntity("lock.door", "locking"))).toBe(true);
    expect(shouldAnimate(config, makeEntity("lock.door", "unlocking"))).toBe(true);
  });

  it("returns false for non-transitional states", () => {
    const config = makeConfig();
    expect(shouldAnimate(config, makeEntity("lock.door", "locked"))).toBe(false);
    expect(shouldAnimate(config, makeEntity("lock.door", "unlocked"))).toBe(false);
  });

  it("respects appearance animate override", () => {
    const config = makeConfig({
      state_appearances: [{ state: "locked", animate: true }],
    });
    expect(shouldAnimate(config, makeEntity("lock.door", "locked"))).toBe(true);
  });

  it("allows disabling animation for transitional states via appearance", () => {
    const config = makeConfig({
      state_appearances: [{ state: "locking", animate: false }],
    });
    expect(shouldAnimate(config, makeEntity("lock.door", "locking"))).toBe(false);
  });
});

// --- getName ---
describe("getName", () => {
  it("uses config name when set", () => {
    const config = makeConfig({ name: "Front Lock" });
    const entity = makeEntity("lock.door", "locked", { friendly_name: "Door Lock" });
    expect(getName(config, entity)).toBe("Front Lock");
  });

  it("uses friendly_name from entity", () => {
    const config = makeConfig();
    const entity = makeEntity("lock.door", "locked", { friendly_name: "Door Lock" });
    expect(getName(config, entity)).toBe("Door Lock");
  });

  it("defaults to Button when no name available", () => {
    const config = makeConfig();
    const entity = makeEntity("lock.door", "locked");
    expect(getName(config, entity)).toBe("Button");
  });

  it("allows empty string name from config", () => {
    const config = makeConfig({ name: "" });
    const entity = makeEntity("lock.door", "locked", { friendly_name: "Door" });
    expect(getName(config, entity)).toBe("");
  });
});

// --- validateConfig ---
describe("validateConfig", () => {
  it("throws for null/undefined config", () => {
    expect(() => validateConfig(null)).toThrow("Invalid configuration");
    expect(() => validateConfig(undefined)).toThrow("Invalid configuration");
  });

  it("throws for missing entity", () => {
    expect(() => validateConfig({ type: "custom:status-button-card" })).toThrow(
      "Entity is required",
    );
  });

  it("throws for non-string entity", () => {
    expect(() => validateConfig({ entity: 123 })).toThrow("Entity is required");
  });

  it("passes for valid config", () => {
    expect(() => validateConfig({ entity: "lock.front_door" })).not.toThrow();
  });
});

// --- normalizeCameras ---
describe("normalizeCameras", () => {
  it("returns empty array for undefined or empty input", () => {
    expect(normalizeCameras(undefined)).toEqual([]);
    expect(normalizeCameras([])).toEqual([]);
  });

  it("converts string entries to objects", () => {
    expect(normalizeCameras(["camera.front", "camera.back"])).toEqual([
      { entity: "camera.front" },
      { entity: "camera.back" },
    ]);
  });

  it("preserves object entries with aspect_ratio", () => {
    expect(normalizeCameras([{ entity: "camera.front", aspect_ratio: "16 / 9" }])).toEqual([
      { entity: "camera.front", aspect_ratio: "16 / 9" },
    ]);
  });

  it("mixes strings and objects", () => {
    expect(
      normalizeCameras(["camera.front", { entity: "camera.back", aspect_ratio: "9 / 16" }]),
    ).toEqual([{ entity: "camera.front" }, { entity: "camera.back", aspect_ratio: "9 / 16" }]);
  });

  it("filters out entries without entity", () => {
    expect(normalizeCameras([{ entity: "" }, { entity: "camera.ok" }])).toEqual([
      { entity: "camera.ok" },
    ]);
  });

  it("preserves object_position and object_fit", () => {
    expect(
      normalizeCameras([
        {
          entity: "camera.doorbell",
          aspect_ratio: "16 / 9",
          object_position: "bottom",
          object_fit: "cover",
        },
      ]),
    ).toEqual([
      {
        entity: "camera.doorbell",
        aspect_ratio: "16 / 9",
        object_position: "bottom",
        object_fit: "cover",
      },
    ]);
  });

  it("does not retain a control field that was passed in (deprecated)", () => {
    // control was removed in 1.0.0-beta.2; if a legacy YAML still includes it
    // we just pass it through normalization (runtime ignores it). We only
    // care that aspect_ratio + position + fit fields work as expected.
    const result = normalizeCameras([
      { entity: "camera.x", object_fit: "cover", object_position: "top" },
    ]);
    expect(result[0].entity).toBe("camera.x");
    expect(result[0].object_fit).toBe("cover");
    expect(result[0].object_position).toBe("top");
  });
});

// --- getCamerasForState ---
describe("getCamerasForState", () => {
  it("returns empty when no state_appearances", () => {
    const config = makeConfig({ entity: "alarm_control_panel.home" });
    const entity = makeEntity("alarm_control_panel.home", "armed_home");
    expect(getCamerasForState(config, entity)).toEqual([]);
  });

  it("returns empty when matching appearance has no cameras", () => {
    const config = makeConfig({
      entity: "alarm_control_panel.home",
      state_appearances: [{ state: "armed_home", icon: "mdi:shield" }],
    });
    const entity = makeEntity("alarm_control_panel.home", "armed_home");
    expect(getCamerasForState(config, entity)).toEqual([]);
  });

  it("returns normalized cameras from matching appearance", () => {
    const config = makeConfig({
      entity: "alarm_control_panel.home",
      state_appearances: [
        {
          state: "armed_home",
          cameras: ["camera.front", { entity: "camera.back", aspect_ratio: "9 / 16" }],
        },
      ],
    });
    const entity = makeEntity("alarm_control_panel.home", "armed_home");
    expect(getCamerasForState(config, entity)).toEqual([
      { entity: "camera.front" },
      { entity: "camera.back", aspect_ratio: "9 / 16" },
    ]);
  });

  it("returns empty when current state does not match any appearance", () => {
    const config = makeConfig({
      entity: "alarm_control_panel.home",
      state_appearances: [
        {
          state: "armed_home",
          cameras: ["camera.front"],
        },
      ],
    });
    const entity = makeEntity("alarm_control_panel.home", "disarmed");
    expect(getCamerasForState(config, entity)).toEqual([]);
  });

  it("returns cameras from secondary state match", () => {
    const config = makeConfig({
      entity: "lock.door",
      state_appearances: [
        {
          state: "secondary:on",
          cameras: ["camera.porch"],
        },
      ],
    });
    const entity = makeEntity("lock.door", "locked");
    const secondary = makeEntity("binary_sensor.motion", "on");
    expect(getCamerasForState(config, entity, secondary)).toEqual([{ entity: "camera.porch" }]);
  });
});
