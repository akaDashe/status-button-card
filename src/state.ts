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
import type { StatusButtonCardConfig, StateAppearance, HassEntity } from "./types";

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

export function findAppearance(
  appearances: StateAppearance[] | undefined,
  entityState: string,
  secondaryState?: string,
): StateAppearance | undefined {
  if (!appearances?.length) return undefined;

  let match = appearances.find((a) => a.state === entityState);
  if (match) return match;

  if (secondaryState) {
    match = appearances.find((a) => a.state === `secondary:${secondaryState}`);
    if (match) return match;
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

export function validateConfig(config: any): void {
  if (!config || typeof config !== "object") {
    throw new Error("Invalid configuration");
  }
  if (!config.entity || typeof config.entity !== "string") {
    throw new Error("Entity is required");
  }
}
