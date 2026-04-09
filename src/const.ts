export const CARD_TAG = "dashe-status-button-card";
export const EDITOR_TAG = "dashe-status-button-card-editor";
export const CARD_VERSION = "1.0.0-beta.1";

export const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch",
  climate: "mdi:thermometer",
  media_player: "mdi:speaker",
  cover: "mdi:blinds-horizontal",
  lock: "mdi:lock",
  camera: "mdi:cctv",
  sensor: "mdi:eye",
  binary_sensor: "mdi:motion-sensor",
  fan: "mdi:fan",
  vacuum: "mdi:robot-vacuum",
  person: "mdi:account",
  device_tracker: "mdi:map-marker",
  alarm_control_panel: "mdi:shield-check",
  input_boolean: "mdi:toggle-switch",
  weather: "mdi:weather-cloudy",
};

// Colors
export const COLOR_GREEN = "rgba(46, 175, 80, 0.9)";
export const COLOR_RED = "rgba(244, 67, 54, 1)";
export const COLOR_ORANGE = "rgba(255, 170, 0, 1)";
export const COLOR_BLUE = "rgba(33, 150, 243, 1)";
export const COLOR_GREY = "rgb(130, 130, 130)";
export const COLOR_PURPLE = "rgba(156, 39, 176, 1)";
export const COLOR_AMBER = "rgba(255, 193, 7, 1)";
export const COLOR_TEAL = "rgba(0, 150, 136, 1)";

export const COLOR_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Default" },
  { value: COLOR_GREEN, label: "Green" },
  { value: COLOR_RED, label: "Red" },
  { value: COLOR_ORANGE, label: "Orange" },
  { value: COLOR_BLUE, label: "Blue" },
  { value: COLOR_PURPLE, label: "Purple" },
  { value: COLOR_AMBER, label: "Amber" },
  { value: COLOR_TEAL, label: "Teal" },
  { value: COLOR_GREY, label: "Grey" },
];

// Default active/inactive colors per domain
export const DOMAIN_ACTIVE_COLOR: Record<string, string> = {
  lock: COLOR_GREEN,
  alarm_control_panel: COLOR_GREEN,
  light: COLOR_AMBER,
  switch: COLOR_AMBER,
  input_boolean: COLOR_GREEN,
  climate: COLOR_ORANGE,
  media_player: COLOR_BLUE,
  camera: COLOR_GREEN,
  binary_sensor: COLOR_BLUE,
  person: COLOR_GREEN,
  device_tracker: COLOR_GREEN,
  sensor: COLOR_TEAL,
  vacuum: COLOR_GREEN,
  fan: COLOR_TEAL,
  cover: COLOR_BLUE,
};

export const DOMAIN_INACTIVE_COLOR: Record<string, string> = {
  lock: COLOR_RED,
  alarm_control_panel: COLOR_GREY,
};

export const DOMAIN_TRANSITIONAL_COLOR: Record<string, string> = {
  lock: COLOR_ORANGE,
  alarm_control_panel: COLOR_ORANGE,
  cover: COLOR_ORANGE,
};

// States considered "active" per domain
export const ACTIVE_STATES: Record<string, string[]> = {
  light: ["on"],
  switch: ["on"],
  fan: ["on"],
  input_boolean: ["on"],
  climate: ["heat", "cool", "heat_cool", "fan_only", "auto"],
  media_player: ["playing", "paused", "on"],
  cover: ["open", "opening", "closing"],
  lock: ["locked"],
  binary_sensor: ["on"],
  alarm_control_panel: ["armed_home", "armed_away", "armed_night", "armed_vacation"],
  camera: ["recording", "streaming"],
  vacuum: ["cleaning", "returning"],
  person: ["home"],
  device_tracker: ["home"],
};

// States considered "transitional" (trigger animation)
export const TRANSITIONAL_STATES: Record<string, string[]> = {
  lock: ["locking", "unlocking"],
  alarm_control_panel: ["arming", "pending"],
  cover: ["opening", "closing"],
};
