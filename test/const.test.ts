import { describe, it, expect } from "vitest";
import {
  CARD_TAG,
  EDITOR_TAG,
  CARD_VERSION,
  DOMAIN_ICONS,
  DOMAIN_ACTIVE_COLOR,
  DOMAIN_INACTIVE_COLOR,
  DOMAIN_TRANSITIONAL_COLOR,
  ACTIVE_STATES,
  TRANSITIONAL_STATES,
  COLOR_OPTIONS,
} from "../src/const";

describe("constants", () => {
  it("has correct card tag", () => {
    expect(CARD_TAG).toBe("dashe-status-button-card");
  });

  it("has correct editor tag", () => {
    expect(EDITOR_TAG).toBe("dashe-status-button-card-editor");
  });

  it("has a semver version", () => {
    expect(CARD_VERSION).toMatch(/^\d+\.\d+\.\d+(-[\w.]+)?$/);
  });
});

describe("DOMAIN_ICONS", () => {
  it("has icons for common domains", () => {
    const expected = [
      "light",
      "switch",
      "climate",
      "media_player",
      "cover",
      "lock",
      "camera",
      "sensor",
      "binary_sensor",
      "fan",
      "vacuum",
      "person",
      "alarm_control_panel",
    ];
    for (const domain of expected) {
      expect(DOMAIN_ICONS[domain]).toBeDefined();
      expect(DOMAIN_ICONS[domain]).toMatch(/^mdi:/);
    }
  });
});

describe("ACTIVE_STATES", () => {
  it("has active states for lock", () => {
    expect(ACTIVE_STATES["lock"]).toContain("locked");
  });

  it("has active states for light", () => {
    expect(ACTIVE_STATES["light"]).toContain("on");
  });

  it("has active states for cover", () => {
    expect(ACTIVE_STATES["cover"]).toContain("open");
  });

  it("has active states for alarm", () => {
    expect(ACTIVE_STATES["alarm_control_panel"]).toContain("armed_home");
    expect(ACTIVE_STATES["alarm_control_panel"]).toContain("armed_away");
  });
});

describe("TRANSITIONAL_STATES", () => {
  it("has transitional states for lock", () => {
    expect(TRANSITIONAL_STATES["lock"]).toContain("locking");
    expect(TRANSITIONAL_STATES["lock"]).toContain("unlocking");
  });

  it("has transitional states for cover", () => {
    expect(TRANSITIONAL_STATES["cover"]).toContain("opening");
    expect(TRANSITIONAL_STATES["cover"]).toContain("closing");
  });

  it("has transitional states for alarm", () => {
    expect(TRANSITIONAL_STATES["alarm_control_panel"]).toContain("arming");
  });
});

describe("COLOR_OPTIONS", () => {
  it("has a Default option with empty value", () => {
    expect(COLOR_OPTIONS[0]).toEqual({ value: "", label: "Default" });
  });

  it("has at least 5 color options", () => {
    expect(COLOR_OPTIONS.length).toBeGreaterThanOrEqual(5);
  });

  it("all options have value and label", () => {
    for (const opt of COLOR_OPTIONS) {
      expect(opt).toHaveProperty("value");
      expect(opt).toHaveProperty("label");
      expect(typeof opt.label).toBe("string");
    }
  });
});

describe("domain color maps", () => {
  it("has active colors for key domains", () => {
    expect(DOMAIN_ACTIVE_COLOR["lock"]).toBeDefined();
    expect(DOMAIN_ACTIVE_COLOR["light"]).toBeDefined();
    expect(DOMAIN_ACTIVE_COLOR["cover"]).toBeDefined();
  });

  it("has inactive color for lock", () => {
    expect(DOMAIN_INACTIVE_COLOR["lock"]).toBeDefined();
  });

  it("has transitional color for lock", () => {
    expect(DOMAIN_TRANSITIONAL_COLOR["lock"]).toBeDefined();
  });
});
