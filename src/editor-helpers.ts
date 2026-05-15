// Pure helpers extracted from the editor for unit-testability. The editor
// itself is a LitElement with DOM/hass dependencies; keeping these here lets
// us verify the transformation logic without spinning up a browser.

import { COLOR_OPTIONS } from "./const";
import type { HomeAssistant } from "./types";

// ha-form's `select` selector treats an empty-string value as "no selection"
// and will refuse to display it. We swap "" ↔ "_default" at the form
// boundary so the COLOR_OPTIONS Default entry survives the round-trip.
export const COLOR_DEFAULT_SENTINEL = "_default";

export const COLOR_SELECT_OPTIONS = COLOR_OPTIONS.map((c) => ({
  value: c.value === "" ? COLOR_DEFAULT_SENTINEL : c.value,
  label: c.label,
}));

export function colorToFormValue(v: string | undefined): string {
  return v && v.length ? v : COLOR_DEFAULT_SENTINEL;
}

export function colorFromFormValue(v: string | undefined): string | undefined {
  return !v || v === COLOR_DEFAULT_SENTINEL ? undefined : v;
}

// Typical state machine values per HA domain. Used to populate the State
// Overrides dropdown so users pick known states rather than typing free-text.
// Free-text input still works because the editor's select uses
// `custom_value: true`.
export const DOMAIN_KNOWN_STATES: Record<string, string[]> = {
  light: ["on", "off", "unavailable", "unknown"],
  switch: ["on", "off", "unavailable", "unknown"],
  fan: ["on", "off", "unavailable", "unknown"],
  input_boolean: ["on", "off", "unavailable", "unknown"],
  automation: ["on", "off", "unavailable", "unknown"],
  script: ["on", "off", "unavailable", "unknown"],
  binary_sensor: ["on", "off", "unavailable", "unknown"],
  cover: ["open", "opening", "closing", "closed", "unavailable", "unknown"],
  lock: ["locked", "unlocked", "locking", "unlocking", "jammed", "unavailable", "unknown"],
  climate: [
    "off",
    "heat",
    "cool",
    "heat_cool",
    "auto",
    "dry",
    "fan_only",
    "unavailable",
    "unknown",
  ],
  media_player: [
    "playing",
    "paused",
    "idle",
    "off",
    "on",
    "standby",
    "buffering",
    "unavailable",
    "unknown",
  ],
  alarm_control_panel: [
    "disarmed",
    "armed_home",
    "armed_away",
    "armed_night",
    "armed_vacation",
    "armed_custom_bypass",
    "arming",
    "pending",
    "triggered",
    "disarming",
    "unavailable",
    "unknown",
  ],
  person: ["home", "not_home", "unavailable", "unknown"],
  device_tracker: ["home", "not_home", "unavailable", "unknown"],
  vacuum: ["cleaning", "docked", "idle", "paused", "returning", "error", "unavailable", "unknown"],
  camera: ["idle", "recording", "streaming", "unavailable", "unknown"],
  sun: ["above_horizon", "below_horizon"],
  weather: [
    "clear-night",
    "cloudy",
    "exceptional",
    "fog",
    "hail",
    "lightning",
    "lightning-rainy",
    "partlycloudy",
    "pouring",
    "rainy",
    "snowy",
    "snowy-rainy",
    "sunny",
    "windy",
    "windy-variant",
    "unavailable",
    "unknown",
  ],
};

/**
 * Possible state values for a given entity, drawn from the domain's known
 * state machine plus any current state value or `options` attribute that
 * isn't in the known list (e.g. sensors with numeric readings, `select`
 * entity domains).
 */
export function statesForEntity(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): string[] {
  if (!entityId) return [];
  const domain = entityId.split(".")[0];
  const known = DOMAIN_KNOWN_STATES[domain] || ["unavailable", "unknown"];
  const live = new Set<string>(known);
  const cur = hass?.states[entityId];
  if (cur?.state) live.add(cur.state);
  const opts = cur?.attributes?.options as string[] | undefined;
  if (Array.isArray(opts)) opts.forEach((o) => live.add(o));
  return [...live];
}

/**
 * Build the option list shown in the State Overrides "state" dropdown:
 * the primary entity's states, then the secondary entity's states prefixed
 * with `secondary:`.
 */
export function buildStateOptions(
  hass: HomeAssistant | undefined,
  primary: string | undefined,
  secondary: string | undefined,
): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  statesForEntity(hass, primary).forEach((s) => options.push({ value: s, label: s }));
  statesForEntity(hass, secondary).forEach((s) =>
    options.push({ value: `secondary:${s}`, label: `secondary: ${s}` }),
  );
  return options;
}

/**
 * Move the item at `from` to position `to` in a copy of `list`. `to` is
 * interpreted as the index *before which* the moved item will sit after the
 * move (so insertions at the end pass `to === list.length`). Returns the
 * original list unchanged when from/to are equal, out of bounds, or would
 * otherwise be a no-op — keeping rerenders cheap.
 */
export function reorderList<T>(list: readonly T[], from: number, to: number): T[] {
  if (from < 0 || from >= list.length) return list.slice();
  // Clamp `to` into [0, list.length].
  const target = Math.max(0, Math.min(to, list.length));
  // Dropping the item before or after its own position is a no-op.
  if (target === from || target === from + 1) return list.slice();
  const copy = list.slice();
  const [moved] = copy.splice(from, 1);
  // Account for the removal shifting indices that came after `from`.
  const insertAt = target > from ? target - 1 : target;
  copy.splice(insertAt, 0, moved);
  return copy;
}
