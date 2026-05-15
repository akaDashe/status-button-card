import {
  DOMAIN_ICONS,
  DOMAIN_ACTIVE_COLOR,
  DOMAIN_INACTIVE_COLOR,
  DOMAIN_TRANSITIONAL_COLOR,
  ACTIVE_STATES,
  TRANSITIONAL_STATES,
  COLOR_GREEN,
  COLOR_GREY,
} from "./const";
import type { StatusButtonCardConfig, StateAppearance, HassEntity, CameraConfig } from "./types";

export function getDomain(entityId: string): string {
  return entityId.split(".")[0];
}

export function getStateCategory(entity: HassEntity): "active" | "inactive" | "transitional" {
  const domain = getDomain(entity.entity_id);
  const st = entity.state;

  const transitional = TRANSITIONAL_STATES[domain];
  if (transitional?.includes(st)) return "transitional";

  const active = ACTIVE_STATES[domain];
  if (active?.length) {
    return active.includes(st) ? "active" : "inactive";
  }

  if (st === "off" || st === "unavailable" || st === "unknown" || st === "idle") {
    return "inactive";
  }
  return "active";
}

/**
 * State-override matcher. Supports:
 *
 *   "locked"      → exact string match (default when no operator)
 *   ">2", "> 2"   → numeric greater-than (entity state coerced via Number())
 *   ">= 2"        → numeric greater-or-equal
 *   "< 2"         → numeric less-than
 *   "<= 2"        → numeric less-or-equal
 *   "!= foo"      → not equal (string)
 *   "= foo"       → explicit equals (same as bare "foo")
 *   "~= regex"    → regex test against the state string
 *
 * For numeric operators, if either side coerces to NaN the rule does not
 * match — so `> 2` against `unavailable` is false, not "true because NaN
 * comparisons throw". Invalid regexes return false rather than throwing.
 */
export function stateMatchesPattern(pattern: string, value: string): boolean {
  if (pattern === undefined || pattern === null) return false;
  const trimmed = pattern.trim();

  // Order matters — two-char ops must be tried before single-char.
  const ops = [">=", "<=", "!=", "~=", ">", "<", "="] as const;
  for (const op of ops) {
    if (!trimmed.startsWith(op)) continue;
    const rhs = trimmed.slice(op.length).trim();
    if (op === "=") return value === rhs;
    if (op === "!=") return value !== rhs;
    if (op === "~=") {
      try {
        return new RegExp(rhs).test(value);
      } catch (_) {
        return false;
      }
    }
    const lhs = Number(value);
    const rhsNum = Number(rhs);
    if (Number.isNaN(lhs) || Number.isNaN(rhsNum)) return false;
    if (op === ">=") return lhs >= rhsNum;
    if (op === "<=") return lhs <= rhsNum;
    if (op === ">") return lhs > rhsNum;
    if (op === "<") return lhs < rhsNum;
  }
  return value === trimmed;
}

export function findAppearance(
  appearances: StateAppearance[] | undefined,
  entityState: string,
  secondaryState?: string,
): StateAppearance | undefined {
  if (!appearances?.length) return undefined;

  // Two passes: primary-entity rules first (in declaration order so the
  // user can order by specificity), then secondary-entity rules. Within
  // each pass we use pattern matching so comparison operators work.
  for (const a of appearances) {
    if (!a.state || a.state.startsWith("secondary:")) continue;
    if (stateMatchesPattern(a.state, entityState)) return a;
  }

  if (secondaryState !== undefined) {
    for (const a of appearances) {
      if (!a.state || !a.state.startsWith("secondary:")) continue;
      const inner = a.state.slice("secondary:".length);
      if (stateMatchesPattern(inner, secondaryState)) return a;
    }
  }

  return undefined;
}

export function getColor(
  config: StatusButtonCardConfig,
  entity: HassEntity,
  secondary?: HassEntity,
): string {
  const appearance = findAppearance(config.state_appearances, entity.state, secondary?.state);
  if (appearance?.color) return appearance.color;

  const category = getStateCategory(entity);
  const domain = getDomain(entity.entity_id);

  if (category === "transitional") {
    return config.transitional_color || DOMAIN_TRANSITIONAL_COLOR[domain] || COLOR_GREY;
  }
  if (category === "active") {
    return config.active_color || DOMAIN_ACTIVE_COLOR[domain] || COLOR_GREEN;
  }
  return config.inactive_color || DOMAIN_INACTIVE_COLOR[domain] || COLOR_GREY;
}

export function getIcon(
  config: StatusButtonCardConfig,
  entity: HassEntity,
  secondary?: HassEntity,
): string {
  const appearance = findAppearance(config.state_appearances, entity.state, secondary?.state);
  if (appearance?.icon) return appearance.icon;

  if (config.icon) return config.icon;
  if (entity.attributes.icon) return entity.attributes.icon;

  const domain = getDomain(entity.entity_id);
  return DOMAIN_ICONS[domain] || "mdi:help-circle";
}

export function getLabel(
  config: StatusButtonCardConfig,
  entity: HassEntity,
  secondary?: HassEntity,
): string {
  const appearance = findAppearance(config.state_appearances, entity.state, secondary?.state);
  if (appearance?.label) return appearance.label;

  return entity.state.replace(/_/g, " ").toUpperCase();
}

export function shouldAnimate(
  config: StatusButtonCardConfig,
  entity: HassEntity,
  secondary?: HassEntity,
): boolean {
  const appearance = findAppearance(config.state_appearances, entity.state, secondary?.state);
  if (appearance?.animate !== undefined) return appearance.animate;

  const domain = getDomain(entity.entity_id);
  const transitional = TRANSITIONAL_STATES[domain];
  return transitional?.includes(entity.state) || false;
}

export function getName(config: StatusButtonCardConfig, entity: HassEntity): string {
  if (config.name !== undefined) return config.name;
  return entity.attributes.friendly_name || "Button";
}

export function normalizeCameras(cameras: (string | CameraConfig)[] | undefined): CameraConfig[] {
  if (!cameras?.length) return [];
  return cameras
    .map((c) => (typeof c === "string" ? { entity: c } : { ...c }))
    .filter((c) => !!c.entity);
}

export function getCamerasForState(
  config: StatusButtonCardConfig,
  entity: HassEntity,
  secondary?: HassEntity,
): CameraConfig[] {
  const match = findAppearance(config.state_appearances, entity.state, secondary?.state);
  return normalizeCameras(match?.cameras);
}

export function validateConfig(config: any): void {
  if (!config || typeof config !== "object") {
    throw new Error("Invalid configuration");
  }
  if (!config.entity || typeof config.entity !== "string") {
    throw new Error("Entity is required");
  }
}
