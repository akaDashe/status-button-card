import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { EDITOR_TAG } from "./const";
import {
  COLOR_SELECT_OPTIONS,
  buildStateOptions,
  colorFromFormValue,
  colorToFormValue,
  reorderList,
} from "./editor-helpers";
import type { StatusButtonCardConfig, HomeAssistant, StateAppearance, CameraConfig } from "./types";

// MDI paths used as inline icons on expansion panels.
const mdiCamera =
  "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z";
const mdiListBox =
  "M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M17,17H11V15H17V17M17,13H11V11H17V13M17,9H11V7H17V9Z";

/** Tiny inline reimplementation of custom-card-helpers' fireEvent. */
function fireEvent(
  node: HTMLElement,
  type: string,
  detail: unknown,
  options?: { bubbles?: boolean; cancelable?: boolean; composed?: boolean },
): void {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail,
      bubbles: options?.bubbles ?? true,
      cancelable: Boolean(options?.cancelable),
      composed: options?.composed ?? true,
    }),
  );
}

@customElement(EDITOR_TAG)
export class StatusButtonCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: StatusButtonCardConfig;
  @state() private _expandedAppearance = -1;
  // Drag-to-reorder state for the State Overrides list. `_dragIndex` is the
  // source row; `_dropBefore` is the index the dragged row will be inserted
  // BEFORE (so list.length means "after the last item"). -1 means "no drag
  // in progress / no visible drop indicator".
  @state() private _dragIndex = -1;
  @state() private _dropBefore = -1;

  public setConfig(config: StatusButtonCardConfig): void {
    this._config = config;
  }

  // Top-level schema rendered via ha-form. Entity, secondary entity, then
  // collapsible Appearance + Actions sections. State Overrides remain custom
  // because they're a list of objects with nested per-item lists (cameras),
  // which ha-form has no first-class pattern for.
  private _topSchema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "secondary_entity", selector: { entity: {} } },
      {
        type: "expandable",
        name: "",
        title: "Appearance",
        iconPath:
          "M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",
        flatten: true,
        schema: [
          { name: "name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} } },
          {
            name: "",
            type: "grid",
            schema: [
              { name: "show_name", selector: { boolean: {} } },
              { name: "show_label", selector: { boolean: {} } },
            ],
          },
          {
            name: "",
            type: "grid",
            schema: [
              {
                name: "active_color",
                selector: { select: { options: COLOR_SELECT_OPTIONS, mode: "dropdown" } },
              },
              {
                name: "inactive_color",
                selector: { select: { options: COLOR_SELECT_OPTIONS, mode: "dropdown" } },
              },
              {
                name: "transitional_color",
                selector: { select: { options: COLOR_SELECT_OPTIONS, mode: "dropdown" } },
              },
            ],
          },
        ],
      },
      {
        type: "expandable",
        name: "",
        title: "Actions",
        iconPath:
          "M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z",
        flatten: true,
        schema: [
          {
            name: "tap_action",
            selector: { ui_action: { default_action: "more-info" } },
          },
          {
            type: "optional_actions",
            name: "",
            flatten: true,
            schema: (["double_tap_action", "hold_action"] as const).map((a) => ({
              name: a,
              selector: { ui_action: { default_action: "none" as const } },
            })),
          },
        ],
      },
    ];
  }

  // Per-state-appearance form schema. The state-value dropdown is built from
  // the configured entity's known/possible states, plus the secondary
  // entity's states prefixed with `secondary:`. custom_value: true keeps the
  // door open for template-style values or odd integrations.
  private _appearanceSchema() {
    const stateOptions = buildStateOptions(
      this.hass,
      this._config?.entity,
      this._config?.secondary_entity,
    );
    return [
      {
        name: "state",
        required: true,
        selector: {
          select: {
            mode: "dropdown",
            custom_value: true,
            options: stateOptions,
          },
        },
      },
      {
        name: "",
        type: "grid",
        schema: [
          { name: "icon", selector: { icon: {} } },
          {
            name: "color",
            selector: { select: { options: COLOR_SELECT_OPTIONS, mode: "dropdown" } },
          },
        ],
      },
      { name: "label", selector: { text: {} } },
      { name: "animate", selector: { boolean: {} } },
    ];
  }

  // Per-camera form schema rendered inside each state appearance's camera list.
  private _cameraSchema() {
    return [
      {
        name: "entity",
        required: true,
        selector: { entity: { domain: "camera" } },
      },
      {
        name: "",
        type: "grid",
        schema: [
          { name: "aspect_ratio", selector: { text: {} } },
          {
            name: "object_fit",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "cover", label: "Cover (crop to fill)" },
                  { value: "contain", label: "Contain (letterbox)" },
                ],
              },
            },
          },
          {
            name: "object_position",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "center", label: "Center" },
                  { value: "top", label: "Top" },
                  { value: "bottom", label: "Bottom" },
                  { value: "left", label: "Left" },
                  { value: "right", label: "Right" },
                ],
              },
            },
          },
        ],
      },
    ];
  }

  private _computeLabel = (schema: { name: string; title?: string }): string => {
    if (schema.title) return schema.title;
    const labels: Record<string, string> = {
      entity: "Entity",
      secondary_entity: "Secondary entity (optional)",
      name: "Name (leave empty for entity name)",
      icon: "Icon",
      show_name: "Show name",
      show_label: "Show label (state)",
      active_color: "Active",
      inactive_color: "Inactive",
      transitional_color: "Transitional",
      tap_action: "Tap action",
      double_tap_action: "Double-tap action",
      hold_action: "Hold action",
      state: "State value",
      label: "Label",
      color: "Color",
      animate: "Blink animation",
      aspect_ratio: "Aspect ratio (e.g. 16/9)",
      object_fit: "Video fit",
      object_position: "Video position",
    };
    return labels[schema.name] ?? schema.name;
  };

  // ha-form sends back the FULL merged data on every change. Normalize the
  // color sentinels and prune empty optionals so the YAML output stays clean.
  private _topChanged = (ev: CustomEvent): void => {
    ev.stopPropagation();
    const incoming = ev.detail.value as StatusButtonCardConfig;
    const next: StatusButtonCardConfig = {
      ...this._config,
      ...incoming,
      active_color: colorFromFormValue(incoming.active_color),
      inactive_color: colorFromFormValue(incoming.inactive_color),
      transitional_color: colorFromFormValue(incoming.transitional_color),
      // Default-true toggles round-trip as `true` from ha-form. Don't
      // persist that to YAML — only persist the non-default `false`.
      show_name: incoming.show_name === false ? false : undefined,
      show_label: incoming.show_label === false ? false : undefined,
    };
    // Strip undefined-valued keys so the resulting YAML is minimal.
    (Object.keys(next) as (keyof StatusButtonCardConfig)[]).forEach((k) => {
      if (next[k] === undefined) delete next[k];
    });
    this._config = next;
    fireEvent(this, "config-changed", { config: this._config });
  };

  private _appearanceChanged(index: number, ev: CustomEvent): void {
    ev.stopPropagation();
    const incoming = ev.detail.value as StateAppearance;
    const list = [...(this._config.state_appearances || [])];
    list[index] = {
      ...list[index],
      ...incoming,
      color: colorFromFormValue(incoming.color),
    };
    // Prune undefineds.
    (Object.keys(list[index]) as (keyof StateAppearance)[]).forEach((k) => {
      if (list[index][k] === undefined) delete list[index][k];
    });
    this._writeConfig({ state_appearances: list });
  }

  private _addAppearance(): void {
    const list = [...(this._config.state_appearances || []), { state: "" } as StateAppearance];
    this._expandedAppearance = list.length - 1;
    this._writeConfig({ state_appearances: list });
  }

  private _removeAppearance(index: number): void {
    const list = (this._config.state_appearances || []).filter((_, i) => i !== index);
    this._expandedAppearance = -1;
    this._writeConfig({
      state_appearances: list.length ? list : undefined,
    });
  }

  // Drag-to-reorder. Only the .drag-handle is draggable=true, so users can
  // click the rest of the header (edit/delete buttons, expand toggle) without
  // accidentally starting a drag.
  private _onDragStart = (index: number) => (ev: DragEvent) => {
    this._dragIndex = index;
    this._dropBefore = index;
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = "move";
      // Firefox requires non-empty data on the dataTransfer to start a drag.
      ev.dataTransfer.setData("text/plain", String(index));
    }
  };

  private _onDragOverItem = (index: number) => (ev: DragEvent) => {
    if (this._dragIndex < 0) return;
    ev.preventDefault();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
    // Drop above or below based on whether the cursor is in the top half
    // of the item.
    const target = ev.currentTarget as HTMLElement | null;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const above = ev.clientY - rect.top < rect.height / 2;
    const before = above ? index : index + 1;
    if (before !== this._dropBefore) this._dropBefore = before;
  };

  private _onDrop = (ev: DragEvent) => {
    if (this._dragIndex < 0) return;
    ev.preventDefault();
    const from = this._dragIndex;
    const to = this._dropBefore;
    this._dragIndex = -1;
    this._dropBefore = -1;
    const list = this._config.state_appearances || [];
    const next = reorderList(list, from, to);
    if (next === list) return;
    // Keep the moved item expanded if it was — recompute its new index.
    if (this._expandedAppearance === from) {
      this._expandedAppearance = next.indexOf(list[from]);
    }
    this._writeConfig({ state_appearances: next });
  };

  private _onDragEnd = () => {
    this._dragIndex = -1;
    this._dropBefore = -1;
  };

  private _normalizedCameras(app: StateAppearance): CameraConfig[] {
    return (app.cameras || []).map((c) => (typeof c === "string" ? { entity: c } : { ...c }));
  }

  private _cameraChanged(appIndex: number, camIndex: number, ev: CustomEvent): void {
    ev.stopPropagation();
    const incoming = ev.detail.value as CameraConfig;
    const app = this._config.state_appearances?.[appIndex];
    if (!app) return;
    const cams = this._normalizedCameras(app);
    cams[camIndex] = { ...cams[camIndex], ...incoming };
    // Default values shouldn't be persisted.
    if (cams[camIndex].object_fit === "cover") delete cams[camIndex].object_fit;
    if (cams[camIndex].object_position === "center") delete cams[camIndex].object_position;
    if (!cams[camIndex].aspect_ratio) delete cams[camIndex].aspect_ratio;
    this._writeAppearanceCameras(appIndex, cams);
  }

  private _addCamera(appIndex: number): void {
    const app = this._config.state_appearances?.[appIndex];
    if (!app) return;
    this._writeAppearanceCameras(appIndex, [...this._normalizedCameras(app), { entity: "" }]);
  }

  private _removeCamera(appIndex: number, camIndex: number): void {
    const app = this._config.state_appearances?.[appIndex];
    if (!app) return;
    const cams = this._normalizedCameras(app).filter((_, i) => i !== camIndex);
    this._writeAppearanceCameras(appIndex, cams);
  }

  private _writeAppearanceCameras(appIndex: number, cams: CameraConfig[]): void {
    const list = [...(this._config.state_appearances || [])];
    list[appIndex] = { ...list[appIndex], cameras: cams.length ? cams : undefined };
    this._writeConfig({ state_appearances: list });
  }

  private _writeConfig(patch: Partial<StatusButtonCardConfig>): void {
    this._config = { ...this._config, ...patch };
    (Object.keys(this._config) as (keyof StatusButtonCardConfig)[]).forEach((k) => {
      if (this._config[k] === undefined) delete this._config[k];
    });
    fireEvent(this, "config-changed", { config: this._config });
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-form {
        display: block;
      }

      .state-overrides {
        margin-top: 16px;
      }

      .section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 500;
        margin: 16px 0 8px;
        color: var(--primary-text-color);
      }

      .appearance-item {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 8px;
      }

      .appearance-item.dragging {
        opacity: 0.5;
      }

      .appearance-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 4px 4px 8px;
        min-height: 48px;
        background: var(--secondary-background-color);
      }

      .drag-handle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        cursor: grab;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }

      .drag-handle:active {
        cursor: grabbing;
      }

      .drag-handle ha-svg-icon {
        --mdc-icon-size: 18px;
      }

      .drop-indicator {
        height: 2px;
        margin: 0 4px;
        background: var(--primary-color, #03a9f4);
        border-radius: 1px;
        pointer-events: none;
      }

      .appearance-label {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .appearance-body {
        padding: 12px;
        border-top: 1px solid var(--divider-color);
      }

      .camera-item {
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        padding: 12px;
        margin-top: 8px;
      }

      .camera-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 4px;
      }

      .add-btn {
        margin-top: 8px;
      }

      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin: 4px 0 0;
      }
    `;
  }

  private _appearanceFormData(app: StateAppearance): StateAppearance {
    return { ...app, color: colorToFormValue(app.color) as any };
  }

  private _renderCameraItem(appIndex: number, cam: CameraConfig, camIndex: number): TemplateResult {
    const data = {
      ...cam,
      object_fit: cam.object_fit || "cover",
      object_position: cam.object_position || "center",
    };
    return html`
      <div class="camera-item">
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${this._cameraSchema()}
          .computeLabel=${this._computeLabel}
          @value-changed=${(e: CustomEvent) => this._cameraChanged(appIndex, camIndex, e)}
        ></ha-form>
        <p class="hint">
          Pair "Cover" + "Bottom" to keep the lower part visible while cropping the top.
        </p>
        <div class="camera-actions">
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            @click=${() => this._removeCamera(appIndex, camIndex)}
          ></ha-icon-button>
        </div>
      </div>
    `;
  }

  private _renderAppearanceItem(app: StateAppearance, index: number): TemplateResult {
    const isExpanded = this._expandedAppearance === index;
    const displayState = app.state || "(empty)";
    const dragging = this._dragIndex === index;
    // Show the drop indicator above the item we'd land before, or below the
    // last item when target === list.length.
    const total = this._config.state_appearances?.length ?? 0;
    const showAbove = this._dragIndex >= 0 && this._dropBefore === index;
    const showBelow = this._dragIndex >= 0 && index === total - 1 && this._dropBefore === total;
    return html`
      ${showAbove ? html`<div class="drop-indicator"></div>` : nothing}
      <div
        class="appearance-item ${dragging ? "dragging" : ""}"
        @dragover=${this._onDragOverItem(index)}
        @drop=${this._onDrop}
      >
        <div class="appearance-header">
          <span
            class="drag-handle"
            draggable="true"
            title="Drag to reorder — first matching rule wins"
            @dragstart=${this._onDragStart(index)}
            @dragend=${this._onDragEnd}
          >
            <ha-svg-icon
              .path=${"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z"}
            ></ha-svg-icon>
          </span>
          ${app.icon
            ? html`<ha-icon
                style="--mdc-icon-size:18px; color:${app.color || "var(--secondary-text-color)"}"
                icon=${app.icon}
              ></ha-icon>`
            : nothing}
          <span class="appearance-label">
            ${displayState}${app.label ? ` → ${app.label}` : ""}
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
              <div class="appearance-body">
                <ha-form
                  .hass=${this.hass}
                  .data=${this._appearanceFormData(app)}
                  .schema=${this._appearanceSchema()}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${(e: CustomEvent) => this._appearanceChanged(index, e)}
                ></ha-form>
                <p class="hint">
                  Pick a state from the dropdown, or type a pattern: <code>locked</code> (exact),
                  <code>!= unavailable</code>, <code>&gt; 2</code>, <code>&gt;= 2</code>,
                  <code>&lt; 100</code>, <code>~= ^armed</code> (regex). Prefix with
                  <code>secondary:</code> to match against the secondary entity (e.g.
                  <code>secondary:&gt;50</code>).
                </p>
                <p class="hint">
                  <strong>Order matters:</strong> rules are evaluated top-to-bottom and the first
                  match wins. Drag the grip handle on the left to reorder — put more-specific
                  patterns above broader ones.
                </p>
                <div class="section-title">
                  <ha-svg-icon .path=${mdiCamera}></ha-svg-icon>
                  <span>Cameras revealed by this state</span>
                </div>
                ${this._normalizedCameras(app).map((cam, ci) =>
                  this._renderCameraItem(index, cam, ci),
                )}
                <ha-button outlined class="add-btn" @click=${() => this._addCamera(index)}>
                  Add camera
                </ha-button>
              </div>
            `
          : nothing}
      </div>
      ${showBelow ? html`<div class="drop-indicator"></div>` : nothing}
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const topData = {
      ...this._config,
      // show_name/show_label default to true at the runtime layer. Surface
      // that to ha-form so the toggles render in the active state when the
      // user hasn't explicitly set them. Persisting `undefined` rather than
      // `true` keeps the resulting YAML minimal.
      show_name: this._config.show_name !== false,
      show_label: this._config.show_label !== false,
      active_color: colorToFormValue(this._config.active_color),
      inactive_color: colorToFormValue(this._config.inactive_color),
      transitional_color: colorToFormValue(this._config.transitional_color),
    };

    const appearances = this._config.state_appearances || [];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${topData}
        .schema=${this._topSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._topChanged}
      ></ha-form>

      <div class="state-overrides">
        <div class="section-title">
          <ha-svg-icon .path=${mdiListBox}></ha-svg-icon>
          <span>State Overrides</span>
        </div>
        ${appearances.map((app, i) => this._renderAppearanceItem(app, i))}
        <ha-button outlined class="add-btn" @click=${this._addAppearance}>
          Add state override
        </ha-button>
      </div>
    `;
  }
}
