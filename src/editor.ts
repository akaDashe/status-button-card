import { LitElement, html, css, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { EDITOR_TAG, COLOR_OPTIONS } from "./const";
import type {
  DasheStatusButtonCardConfig,
  HomeAssistant,
  StateAppearance,
  ActionConfig,
} from "./types";

const ACTION_TYPES = [
  { value: "more-info", label: "More info" },
  { value: "navigate", label: "Navigate" },
  { value: "toggle", label: "Toggle" },
  { value: "call-service", label: "Call service" },
  { value: "perform-action", label: "Perform action" },
  { value: "url", label: "Open URL" },
  { value: "none", label: "None" },
];

// MDI paths
const mdiCardAccountDetails =
  "M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M14,6V7H22V6H14M14,8V9H21.5V8H14M14,10V11H21V10H14M8,13.91C6,13.91 2,15 2,17V18H14V17C14,15 10,13.91 8,13.91M8,6A3,3 0 0,0 5,9A3,3 0 0,0 8,12A3,3 0 0,0 11,9A3,3 0 0,0 8,6Z";
const mdiPalette =
  "M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z";
const mdiListBox =
  "M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M17,17H11V15H17V17M17,13H11V11H17V13M17,9H11V7H17V9Z";
const mdiArrowExpandVertical = "M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13Z";
const mdiGestureTap =
  "M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z";

const _loadPromise = (async () => {
  const needed = [
    "ha-entity-picker",
    "ha-icon-picker",
    "ha-switch",
    "ha-textfield",
    "ha-select",
    "ha-list-item",
    "ha-expansion-panel",
    "ha-button",
    "ha-icon-button",
    "ha-formfield",
    "ha-svg-icon",
  ];
  if (needed.every((t) => customElements.get(t))) return;
  try {
    const helpers = await (window as any).loadCardHelpers?.();
    if (!helpers) return;
    const card = await helpers.createCardElement({
      type: "entities",
      entities: ["sun.sun"],
    });
    if (card) await card.constructor?.getConfigElement?.();
  } catch (_) {
    /* expected */
  }
})();

@customElement(EDITOR_TAG)
export class DasheStatusButtonCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: DasheStatusButtonCardConfig;
  @state() private _expandedAppearance: number = -1;
  @state() private _ready = false;

  async connectedCallback() {
    super.connectedCallback();
    await _loadPromise;
    this._ready = true;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-expansion-panel {
        display: block;
        --expansion-panel-content-padding: 0;
        border-radius: 0;
        --ha-card-border-radius: 0;
      }

      ha-expansion-panel ha-svg-icon {
        color: var(--secondary-text-color);
      }

      h3 {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }

      .content {
        padding: 12px;
      }

      .content > *:not(:first-child) {
        margin-top: 8px;
      }

      .side-by-side {
        display: flex;
        align-items: flex-end;
      }

      .side-by-side > * {
        flex: 1;
        padding-right: 8px;
        padding-inline-end: 8px;
        padding-inline-start: initial;
      }

      .side-by-side > *:last-child {
        flex: 1;
        padding-right: 0;
        padding-inline-end: 0;
        padding-inline-start: initial;
      }

      .triple {
        display: flex;
        align-items: flex-end;
      }

      .triple > * {
        flex: 1;
        padding-right: 8px;
        padding-inline-end: 8px;
        padding-inline-start: initial;
      }

      .triple > *:last-child {
        flex: 1;
        padding-right: 0;
        padding-inline-end: 0;
        padding-inline-start: initial;
      }

      ha-textfield,
      ha-icon-picker,
      ha-entity-picker,
      ha-select {
        display: block;
        width: 100%;
      }

      ha-formfield {
        display: flex;
        min-height: 56px;
        align-items: center;
      }

      ha-switch {
        padding: 16px 6px;
      }

      .appearance-item {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }

      .appearance-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 4px 4px 16px;
        min-height: 48px;
      }

      .appearance-label {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .appearance-options {
        padding: 12px;
        border-top: 1px solid var(--divider-color);
      }

      .appearance-options > *:not(:first-child) {
        margin-top: 8px;
      }

      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin: 0;
        padding-top: 4px;
      }
    `;
  }

  public setConfig(config: DasheStatusButtonCardConfig): void {
    this._config = config;
  }

  private _fire(): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _set(key: string, value: any): void {
    this._config = { ...this._config, [key]: value };
    this._fire();
  }

  private _updateAppearance(index: number, update: Partial<StateAppearance>): void {
    const list = [...(this._config.state_appearances || [])];
    list[index] = { ...list[index], ...update };
    this._set("state_appearances", list);
  }

  private _removeAppearance(index: number): void {
    const list = (this._config.state_appearances || []).filter((_, i) => i !== index);
    this._set("state_appearances", list.length ? list : undefined);
    this._expandedAppearance = -1;
  }

  private _addAppearance(): void {
    const list = [...(this._config.state_appearances || []), { state: "" }];
    this._set("state_appearances", list);
    this._expandedAppearance = list.length - 1;
  }

  private _renderActionEditor(
    key: "tap_action" | "double_tap_action" | "hold_action",
    label: string,
  ) {
    const action: ActionConfig = (this._config as any)[key] || {
      action: key === "tap_action" ? "more-info" : "none",
    };

    return html`
      <ha-select
        .label=${label}
        .value=${action.action}
        fixedMenuPosition
        naturalMenuWidth
        @selected=${(e: CustomEvent) => {
          const val = (e.target as any).value;
          if (val) this._set(key, { action: val });
        }}
        @closed=${(e: Event) => e.stopPropagation()}
      >
        ${ACTION_TYPES.map((t) => html`<ha-list-item .value=${t.value}>${t.label}</ha-list-item>`)}
      </ha-select>
      ${action.action === "navigate"
        ? html`<ha-textfield
            .label=${"Navigation path"}
            .value=${action.navigation_path || ""}
            @input=${(e: any) => this._set(key, { ...action, navigation_path: e.target.value })}
          ></ha-textfield>`
        : nothing}
      ${action.action === "url"
        ? html`<ha-textfield
            .label=${"URL"}
            .value=${action.url_path || ""}
            @input=${(e: any) => this._set(key, { ...action, url_path: e.target.value })}
          ></ha-textfield>`
        : nothing}
      ${action.action === "call-service" || action.action === "perform-action"
        ? html`
            <ha-textfield
              .label=${"Service (e.g. lock.unlock)"}
              .value=${action.service || action.perform_action || ""}
              @input=${(e: any) =>
                this._set(key, {
                  ...action,
                  service: e.target.value,
                  perform_action: e.target.value,
                })}
            ></ha-textfield>
            <ha-textfield
              .label=${"Service data (JSON, optional)"}
              .value=${action.service_data ? JSON.stringify(action.service_data) : ""}
              @input=${(e: any) => {
                try {
                  const data = e.target.value ? JSON.parse(e.target.value) : undefined;
                  this._set(key, { ...action, service_data: data });
                } catch (_) {
                  /* expected */
                }
              }}
            ></ha-textfield>
          `
        : nothing}
    `;
  }

  private _renderAppearanceItem(app: StateAppearance, index: number) {
    const isExpanded = this._expandedAppearance === index;
    const displayState = app.state || "(empty)";

    return html`
      <div class="appearance-item">
        <div class="appearance-header">
          ${app.icon
            ? html`<ha-icon
                style="--mdc-icon-size:18px; color:${app.color || "var(--secondary-text-color)"}"
                icon=${app.icon}
              ></ha-icon>`
            : nothing}
          <span class="appearance-label">
            ${displayState}${app.label ? ` \u2192 ${app.label}` : ""}
          </span>
          <ha-icon-button
            .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}
            @click=${() => {
              this._expandedAppearance = isExpanded ? -1 : index;
            }}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            @click=${() => this._removeAppearance(index)}
          ></ha-icon-button>
        </div>
        ${isExpanded
          ? html`
              <div class="appearance-options">
                <ha-textfield
                  .label=${"State value"}
                  .value=${app.state || ""}
                  @input=${(e: any) => this._updateAppearance(index, { state: e.target.value })}
                ></ha-textfield>
                <p class="hint">
                  Use entity state (e.g. locked, unlocked). For secondary entity prefix with
                  "secondary:" (e.g. secondary:on).
                </p>

                <ha-icon-picker
                  .hass=${this.hass}
                  .label=${"Icon for this state"}
                  .value=${app.icon || ""}
                  @value-changed=${(e: CustomEvent) => {
                    e.stopPropagation();
                    this._updateAppearance(index, {
                      icon: e.detail.value || undefined,
                    });
                  }}
                ></ha-icon-picker>

                <ha-textfield
                  .label=${"Label for this state"}
                  .value=${app.label || ""}
                  @input=${(e: any) =>
                    this._updateAppearance(index, {
                      label: e.target.value || undefined,
                    })}
                ></ha-textfield>

                <ha-select
                  .label=${"Color for this state"}
                  .value=${app.color || ""}
                  fixedMenuPosition
                  naturalMenuWidth
                  @selected=${(e: CustomEvent) => {
                    const val = (e.target as any).value;
                    this._updateAppearance(index, {
                      color: val || undefined,
                    });
                  }}
                  @closed=${(e: Event) => e.stopPropagation()}
                >
                  ${COLOR_OPTIONS.map(
                    (c) => html`<ha-list-item .value=${c.value}>${c.label}</ha-list-item>`,
                  )}
                </ha-select>

                <ha-formfield .label=${"Blink animation"}>
                  <ha-switch
                    .checked=${app.animate === true}
                    @change=${(e: any) =>
                      this._updateAppearance(index, {
                        animate: e.target.checked || undefined,
                      })}
                  ></ha-switch>
                </ha-formfield>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config || !this._ready) return html``;

    const appearances = this._config.state_appearances || [];

    return html`
      <!-- Entity -->
      <ha-expansion-panel outlined expanded>
        <ha-svg-icon slot="leading-icon" .path=${mdiCardAccountDetails}></ha-svg-icon>
        <h3 slot="header">Entity</h3>
        <div class="content">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.entity || ""}
            .label=${"Entity"}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) => {
              e.stopPropagation();
              this._set("entity", e.detail.value);
            }}
          ></ha-entity-picker>

          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.secondary_entity || ""}
            .label=${"Secondary entity (optional)"}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) => {
              e.stopPropagation();
              this._set("secondary_entity", e.detail.value || undefined);
            }}
          ></ha-entity-picker>
        </div>
      </ha-expansion-panel>

      <!-- Appearance -->
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${mdiPalette}></ha-svg-icon>
        <h3 slot="header">Appearance</h3>
        <div class="content">
          <ha-textfield
            .label=${"Name (leave empty for entity name)"}
            .value=${this._config.name || ""}
            @input=${(e: any) => this._set("name", e.target.value || undefined)}
          ></ha-textfield>

          <ha-icon-picker
            .hass=${this.hass}
            .label=${"Default icon (leave empty for auto)"}
            .value=${this._config.icon || ""}
            @value-changed=${(e: CustomEvent) => {
              e.stopPropagation();
              this._set("icon", e.detail.value || undefined);
            }}
          ></ha-icon-picker>

          <ha-formfield .label=${"Show name"}>
            <ha-switch
              .checked=${this._config.show_name !== false}
              @change=${(e: any) => this._set("show_name", e.target.checked ? undefined : false)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show label (state)"}>
            <ha-switch
              .checked=${this._config.show_label !== false}
              @change=${(e: any) => this._set("show_label", e.target.checked ? undefined : false)}
            ></ha-switch>
          </ha-formfield>

          <div class="triple">
            <ha-select
              .label=${"Active"}
              .value=${this._config.active_color || ""}
              fixedMenuPosition
              naturalMenuWidth
              @selected=${(e: CustomEvent) => {
                const val = (e.target as any).value;
                this._set("active_color", val || undefined);
              }}
              @closed=${(e: Event) => e.stopPropagation()}
            >
              ${COLOR_OPTIONS.map(
                (c) => html`<ha-list-item .value=${c.value}>${c.label}</ha-list-item>`,
              )}
            </ha-select>
            <ha-select
              .label=${"Inactive"}
              .value=${this._config.inactive_color || ""}
              fixedMenuPosition
              naturalMenuWidth
              @selected=${(e: CustomEvent) => {
                const val = (e.target as any).value;
                this._set("inactive_color", val || undefined);
              }}
              @closed=${(e: Event) => e.stopPropagation()}
            >
              ${COLOR_OPTIONS.map(
                (c) => html`<ha-list-item .value=${c.value}>${c.label}</ha-list-item>`,
              )}
            </ha-select>
            <ha-select
              .label=${"Transitional"}
              .value=${this._config.transitional_color || ""}
              fixedMenuPosition
              naturalMenuWidth
              @selected=${(e: CustomEvent) => {
                const val = (e.target as any).value;
                this._set("transitional_color", val || undefined);
              }}
              @closed=${(e: Event) => e.stopPropagation()}
            >
              ${COLOR_OPTIONS.map(
                (c) => html`<ha-list-item .value=${c.value}>${c.label}</ha-list-item>`,
              )}
            </ha-select>
          </div>
        </div>
      </ha-expansion-panel>

      <!-- State Overrides -->
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${mdiListBox}></ha-svg-icon>
        <h3 slot="header">State Overrides</h3>
        <div class="content">
          ${appearances.map((app, index) => this._renderAppearanceItem(app, index))}
          <ha-button @click=${this._addAppearance}> Add state override </ha-button>
        </div>
      </ha-expansion-panel>

      <!-- Sizing -->
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${mdiArrowExpandVertical}></ha-svg-icon>
        <h3 slot="header">Sizing</h3>
        <div class="content">
          <div class="side-by-side">
            <ha-textfield
              .label=${"Min width"}
              .value=${this._config.min_width || ""}
              placeholder="68px"
              @input=${(e: any) => this._set("min_width", e.target.value || undefined)}
            ></ha-textfield>
            <ha-textfield
              .label=${"Max width"}
              .value=${this._config.max_width || ""}
              placeholder="85px"
              @input=${(e: any) => this._set("max_width", e.target.value || undefined)}
            ></ha-textfield>
          </div>
          <div class="side-by-side">
            <ha-textfield
              .label=${"Height"}
              .value=${this._config.height || ""}
              placeholder="68px"
              @input=${(e: any) => this._set("height", e.target.value || undefined)}
            ></ha-textfield>
            <ha-textfield
              .label=${"Icon size"}
              .value=${this._config.icon_size || ""}
              placeholder="32px"
              @input=${(e: any) => this._set("icon_size", e.target.value || undefined)}
            ></ha-textfield>
          </div>
        </div>
      </ha-expansion-panel>

      <!-- Actions -->
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${mdiGestureTap}></ha-svg-icon>
        <h3 slot="header">Actions</h3>
        <div class="content">
          ${this._renderActionEditor("tap_action", "Tap action")}
          ${this._renderActionEditor("double_tap_action", "Double tap action")}
          ${this._renderActionEditor("hold_action", "Hold action")}
        </div>
      </ha-expansion-panel>
    `;
  }
}
