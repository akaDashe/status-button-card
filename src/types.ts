export interface ActionConfig {
  action: "more-info" | "navigate" | "call-service" | "perform-action" | "toggle" | "url" | "none";
  navigation_path?: string;
  url_path?: string;
  service?: string;
  perform_action?: string;
  service_data?: Record<string, unknown>;
  target?: { entity_id: string | string[] };
}

export interface StateAppearance {
  state: string;
  icon?: string;
  label?: string;
  color?: string;
  animate?: boolean;
}

export interface StatusButtonCardConfig {
  type: string;
  entity: string;
  name?: string;
  secondary_entity?: string;
  icon?: string;
  show_name?: boolean;
  show_label?: boolean;
  state_appearances?: StateAppearance[];
  active_color?: string;
  inactive_color?: string;
  transitional_color?: string;
  icon_size?: string;
  min_width?: string;
  max_width?: string;
  height?: string;
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface EntityRegistryEntry {
  display_precision?: number;
  [key: string]: any;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities: Record<string, EntityRegistryEntry>;
  callService: (
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: { entity_id: string | string[] },
  ) => Promise<void>;
  language: string;
  themes: unknown;
  config: HassConfig;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HassConfig {
  unit_system: { temperature: string };
}
