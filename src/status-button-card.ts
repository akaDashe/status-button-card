import { LitElement, html, nothing, PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { CARD_TAG, EDITOR_TAG, CARD_VERSION } from "./const";
import {
  getDomain,
  getColor,
  getIcon,
  getLabel,
  shouldAnimate,
  getName,
  validateConfig,
} from "./state";
import type { StatusButtonCardConfig, ActionConfig, HomeAssistant } from "./types";

import "./editor";

console.info(
  `%c STATUS-BUTTON-CARD %c v${CARD_VERSION} `,
  "color: white; background: #607d8b; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #607d8b; background: white; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;",
);

@customElement(CARD_TAG)
export class StatusButtonCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: StatusButtonCardConfig;

  private _dblClickTimer: ReturnType<typeof setTimeout> | null = null;
  private _holdTimer: ReturnType<typeof setTimeout> | null = null;
  private _held = false;

  static get styles() {
    return cardStyles;
  }

  public static getConfigElement() {
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(hass: HomeAssistant) {
    const lock = Object.keys(hass.states).find((e) => e.startsWith("lock."));
    return {
      type: `custom:${CARD_TAG}`,
      entity: lock || "lock.front_door",
    };
  }

  public setConfig(config: StatusButtonCardConfig): void {
    validateConfig(config);
    this._config = config;
  }

  public getCardSize(): number {
    return 1;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config")) return true;
    if (changedProps.has("hass")) {
      const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
      if (!oldHass) return true;
      const ids = [this._config.entity];
      if (this._config.secondary_entity) ids.push(this._config.secondary_entity);
      return ids.some((id) => oldHass.states[id] !== this.hass.states[id]);
    }
    return true;
  }

  // --- Actions ---
  private _handleAction(actionConfig: ActionConfig | undefined): void {
    if (!actionConfig || actionConfig.action === "none") return;
    switch (actionConfig.action) {
      case "more-info": {
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: { entityId: this._config.entity },
          }),
        );
        break;
      }
      case "navigate":
        if (actionConfig.navigation_path) {
          history.pushState(null, "", actionConfig.navigation_path);
          window.dispatchEvent(new Event("location-changed", { bubbles: true, composed: true }));
        }
        break;
      case "url":
        if (actionConfig.url_path) window.open(actionConfig.url_path, "_blank");
        break;
      case "call-service":
      case "perform-action": {
        const svc = actionConfig.service || actionConfig.perform_action;
        if (svc) {
          const [domain, service] = svc.split(".");
          this.hass.callService(
            domain,
            service,
            actionConfig.service_data || {},
            actionConfig.target || { entity_id: this._config.entity },
          );
        }
        break;
      }
      case "toggle": {
        const entity = this.hass.states[this._config.entity];
        if (!entity) break;
        const domain = getDomain(this._config.entity);
        const toggleMap: Record<string, [string, string, string]> = {
          lock: ["locked", "lock.lock", "lock.unlock"],
          cover: ["open", "cover.close", "cover.open"],
        };
        const mapping = toggleMap[domain];
        if (mapping) {
          const [activeState, activeService, inactiveService] = mapping;
          const svc = entity.state === activeState ? inactiveService : activeService;
          const [d, s] = svc.split(".");
          this.hass.callService(d, s, {}, { entity_id: this._config.entity });
        } else {
          const hasDedicatedToggle = [
            "light",
            "switch",
            "fan",
            "input_boolean",
            "media_player",
            "automation",
            "script",
          ];
          if (hasDedicatedToggle.includes(domain)) {
            this.hass.callService(domain, "toggle", {}, { entity_id: this._config.entity });
          } else {
            this.hass.callService(
              "homeassistant",
              "toggle",
              {},
              {
                entity_id: this._config.entity,
              },
            );
          }
        }
        break;
      }
    }
  }

  private _handleTap(): void {
    if (this._held) {
      this._held = false;
      return;
    }
    if (this._dblClickTimer) {
      clearTimeout(this._dblClickTimer);
      this._dblClickTimer = null;
      this._handleAction(this._config.double_tap_action || { action: "none" });
      return;
    }
    this._dblClickTimer = setTimeout(() => {
      this._dblClickTimer = null;
      this._handleAction(this._config.tap_action || { action: "more-info" });
    }, 250);
  }

  private _handlePointerDown(): void {
    this._held = false;
    this._holdTimer = setTimeout(() => {
      this._held = true;
      this._handleAction(this._config.hold_action || { action: "none" });
    }, 500);
  }

  private _handlePointerUp(): void {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  private _getCardStyle(): string {
    const parts: string[] = [];
    if (this._config.icon_size) parts.push(`--dsb-icon-size: ${this._config.icon_size}`);
    if (this._config.min_width) parts.push(`--dsb-min-width: ${this._config.min_width}`);
    if (this._config.max_width) parts.push(`--dsb-max-width: ${this._config.max_width}`);
    if (this._config.height) parts.push(`--dsb-height: ${this._config.height}`);
    return parts.join("; ");
  }

  protected render() {
    if (!this._config || !this.hass) return html``;

    const entity = this.hass.states[this._config.entity];
    if (!entity) return html`<ha-card>Entity not found</ha-card>`;

    const secondary = this._config.secondary_entity
      ? this.hass.states[this._config.secondary_entity]
      : undefined;

    const color = getColor(this._config, entity, secondary);
    const icon = getIcon(this._config, entity, secondary);
    const label = getLabel(this._config, entity, secondary);
    const animate = shouldAnimate(this._config, entity, secondary);
    const name = getName(this._config, entity);
    const showName = this._config.show_name !== false;
    const showLabel = this._config.show_label !== false;

    return html`
      <ha-card
        style="${this._getCardStyle()}"
        @click=${this._handleTap}
        @pointerdown=${this._handlePointerDown}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
      >
        <div class="button-layout" style="border-bottom: 3px solid ${color}">
          <ha-icon
            class="btn-icon ${animate ? "animate" : ""}"
            icon=${icon}
            style="color: ${color}"
          ></ha-icon>
          ${showName ? html`<span class="btn-name">${name}</span>` : nothing}
          ${showLabel
            ? html`<span class="btn-label" style="color: ${color}">${label}</span>`
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_TAG,
  name: "Status Button Card by Dashe",
  description:
    "A customisable button card focused on entity status with state-based icons, colors, and labels",
  preview: true,
});
