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
  getCamerasForState,
} from "./state";
import type { StatusButtonCardConfig, ActionConfig, HomeAssistant, CameraConfig } from "./types";

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
  private _clearCamerasTimer: ReturnType<typeof setTimeout> | null = null;
  private _onResize: (() => void) | null = null;
  private _videoObservers: MutationObserver[] = [];
  @state() private _cameras: CameraConfig[] = [];
  @state() private _camerasOpen = false;

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
    if (changedProps.has("_camerasOpen")) return true;
    if (changedProps.has("_cameras")) return true;
    if (changedProps.has("hass")) {
      const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
      if (!oldHass) return true;
      // Only re-render on primary/secondary entity changes. Camera entity
      // state changes are intentionally ignored — ha-camera-stream manages
      // its own WebRTC lifecycle, and re-passing .hass mid-negotiation
      // breaks the SDP exchange.
      const ids = [this._config.entity];
      if (this._config.secondary_entity) ids.push(this._config.secondary_entity);
      return ids.some((id) => oldHass.states[id] !== this.hass.states[id]);
    }
    return true;
  }

  protected updated(changedProps: PropertyValues): void {
    if (!this._config || !this.hass) return;
    if (!changedProps.has("hass") && !changedProps.has("_config")) return;

    const entity = this.hass.states[this._config.entity];
    if (!entity) return;

    const secondary = this._config.secondary_entity
      ? this.hass.states[this._config.secondary_entity]
      : undefined;

    const next = getCamerasForState(this._config, entity, secondary);
    const open = next.length > 0;

    if (open) {
      const sameList =
        this._cameras.length === next.length &&
        this._cameras.every(
          (c, i) => c.entity === next[i].entity && c.aspect_ratio === next[i].aspect_ratio,
        );
      if (!sameList) this._cameras = next;
      if (this._clearCamerasTimer !== null) {
        clearTimeout(this._clearCamerasTimer);
        this._clearCamerasTimer = null;
      }
    }

    if (open !== this._camerasOpen) {
      this._camerasOpen = open;
      if (!open && this._cameras.length > 0) {
        // Keep panels rendered so the slide-up animation runs.
        // Wrapper transition is 600ms; clear with small buffer.
        if (this._clearCamerasTimer !== null) clearTimeout(this._clearCamerasTimer);
        this._clearCamerasTimer = setTimeout(() => {
          this._cameras = [];
          this._clearCamerasTimer = null;
        }, 700);
      }
    }

    this._updateRevealOffset();
    requestAnimationFrame(() => {
      this._applyVideoFit();
      this._setupVideoObservers();
    });
    // Late-arriving <video> from ha-camera-stream connects asynchronously after
    // WebRTC negotiation. Re-apply at intervals so the inline styles still win.
    setTimeout(() => this._applyVideoFit(), 250);
    setTimeout(() => this._applyVideoFit(), 1500);
  }

  private _setupVideoObservers(): void {
    this._videoObservers.forEach((o) => o.disconnect());
    this._videoObservers = [];
    if (!this.shadowRoot) return;
    const panels = this.shadowRoot.querySelectorAll(".camera-panel");
    panels.forEach((panel) => {
      const observer = new MutationObserver(() => this._applyVideoFit());
      // Watch the panel for any added subtree (including children of ha-camera-stream).
      observer.observe(panel as HTMLElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "srcset"],
      });
      this._videoObservers.push(observer);
    });
  }

  /**
   * Force object-fit:cover on every <video>/<img> inside the camera panels.
   * HA's ha-camera-stream renders its <video> in shadow DOM so CSS from this
   * card can't reach it. We walk into nested shadow roots and set the style
   * imperatively. This makes a portrait doorbell stream crop into a 16/9
   * frame instead of stretching.
   */
  private _applyVideoFit(): void {
    if (!this.shadowRoot) return;

    const collectMatching = (root: HTMLElement | ShadowRoot, selector: string): Element[] => {
      const found: Element[] = [];
      const stack: (HTMLElement | ShadowRoot)[] = [root];
      while (stack.length) {
        const node = stack.pop()!;
        node.querySelectorAll(selector).forEach((el) => found.push(el));
        node.querySelectorAll("*").forEach((el) => {
          const sr = (el as HTMLElement).shadowRoot;
          if (sr) stack.push(sr);
        });
      }
      return found;
    };

    const panels = this.shadowRoot.querySelectorAll(".camera-panel");
    panels.forEach((panel) => {
      const position = (panel as HTMLElement).dataset.objectPosition || "center";
      const fit = (panel as HTMLElement).dataset.objectFit || "cover";

      // Containers between the panel and the actual video need explicit
      // dimensions, otherwise they collapse to the video's natural size and
      // our object-fit on the video has nothing to fill against.
      const containers = collectMatching(
        panel as HTMLElement,
        "ha-camera-stream, ha-web-rtc-player",
      );
      containers.forEach((el) => {
        const styled = el as HTMLElement;
        styled.style.setProperty("display", "block", "important");
        styled.style.setProperty("width", "100%", "important");
        styled.style.setProperty("height", "100%", "important");
        styled.style.setProperty("overflow", "hidden", "important");
      });

      const media = collectMatching(panel as HTMLElement, "video, img");
      media.forEach((el) => {
        const styled = el as HTMLElement;
        styled.style.setProperty("object-fit", fit, "important");
        styled.style.setProperty("object-position", position, "important");
        styled.style.setProperty("width", "100%", "important");
        styled.style.setProperty("height", "100%", "important");
      });

      // Reveal the panel only once we've successfully applied styles to a
      // real media element. This avoids the brief unframed flash where the
      // video renders at native dimensions before our walker catches it.
      if (media.length > 0) {
        (panel as HTMLElement).classList.add("fit-ready");
      }
    });
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._onResize = () => this._updateRevealOffset();
    window.addEventListener("resize", this._onResize);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._onResize) {
      window.removeEventListener("resize", this._onResize);
      this._onResize = null;
    }
    if (this._clearCamerasTimer !== null) {
      clearTimeout(this._clearCamerasTimer);
      this._clearCamerasTimer = null;
    }
    this._videoObservers.forEach((o) => o.disconnect());
    this._videoObservers = [];
    this._camerasOpen = false;
  }

  private _updateRevealOffset(): void {
    const hasAnyCameras = this._config?.state_appearances?.some((a) => a.cameras?.length);
    if (!hasAnyCameras) return;
    const hostRect = this.getBoundingClientRect();
    if (!hostRect.width) return;

    // Find the host's column container — first ancestor that's clearly wider
    // than a single button cell (skips wrappers around just this card).
    const column = this._findColumnElement();
    const columnRect = column
      ? column.getBoundingClientRect()
      : { left: 0, width: window.innerWidth };

    // Wrapper sits at column's left edge with column's width.
    this.style.setProperty("--dsb-host-offset-x", `${columnRect.left - hostRect.left}px`);
    this.style.setProperty("--dsb-column-width", `${columnRect.width}px`);

    // Pointer x is button center relative to the wrapper's left edge.
    const buttonCenter = hostRect.left + hostRect.width / 2;
    this.style.setProperty("--dsb-pointer-x", `${buttonCenter - columnRect.left}px`);
  }

  private _findColumnElement(): HTMLElement | null {
    // First pass: walk up looking for a Lovelace layout container by tag.
    // This handles horizontal-stack / vertical-stack / grid cleanly.
    const isLayoutCard = (el: HTMLElement): boolean => {
      const tag = el.tagName.toLowerCase();
      return (
        tag === "hui-horizontal-stack-card" ||
        tag === "hui-vertical-stack-card" ||
        tag === "hui-grid-card" ||
        tag === "hui-section" ||
        tag === "hui-grid-section"
      );
    };

    let node: Node | null = this.parentNode;
    for (let i = 0; i < 20 && node; i++) {
      if (node instanceof ShadowRoot) {
        node = node.host;
        continue;
      }
      if (node instanceof HTMLElement && isLayoutCard(node)) {
        return node;
      }
      node = (node as Element).parentNode;
    }

    // Fallback: first ancestor at least 240px wide.
    let el: Element | null = this.parentElement;
    while (el && el !== document.body) {
      const w = el.getBoundingClientRect().width;
      if (w >= 240) return el as HTMLElement;
      el = el.parentElement;
    }
    return null;
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

  private _renderCameraReveal(pointerColor: string) {
    // Skip the wrapper entirely if the user has no cameras configured anywhere —
    // avoids leaving a hidden DOM element on cards that don't use this feature.
    const hasAnyCameras = this._config.state_appearances?.some((a) => a.cameras?.length);
    if (!hasAnyCameras) return nothing;

    // Always render the wrapper + inner reveal so the elements persist across
    // state changes — without this the wrapper is created fresh with .open
    // already applied and CSS transitions don't fire on the slide-down.

    const aspect = this._config.camera_aspect_ratio || "16 / 9";
    const revealStyle = [
      `--dsb-camera-aspect: ${aspect}`,
      `--dsb-pointer-color: ${pointerColor}`,
    ].join("; ");

    return html`
      <div
        class="camera-reveal-wrapper ${this._camerasOpen ? "open" : ""}"
        style="${revealStyle}"
        @click=${(e: Event) => e.stopPropagation()}
      >
        <div class="camera-pointer"></div>
        <div class="camera-reveal">
          ${this._cameras.map((cam) => {
            const stateObj = this.hass?.states[cam.entity];
            // Frame aspect is uniform across panels by default. Per-camera
            // override only used when explicitly set; native camera dimensions
            // are NOT auto-applied so all frames stay the same size.
            const aspect = cam.aspect_ratio || "16 / 9";
            const position = cam.object_position || "center";
            const fit = cam.object_fit || "cover";
            // ha-camera-stream renders an actual <video> for real WebRTC/HLS
            // streaming when the camera supports it. Falls back to hui-image
            // (snapshot polling) when no state object or no streaming support.
            return html`
              <div
                class="camera-panel"
                style="aspect-ratio: ${aspect}"
                data-object-position=${position}
                data-object-fit=${fit}
              >
                <div class="camera-spinner"></div>
                <div class="camera-media">
                  ${stateObj
                    ? html`
                        <ha-camera-stream
                          .hass=${this.hass}
                          .stateObj=${stateObj}
                          muted
                          playsinline
                        ></ha-camera-stream>
                      `
                    : html`
                        <hui-image
                          .hass=${this.hass}
                          .cameraImage=${cam.entity}
                          cameraView="live"
                        ></hui-image>
                      `}
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
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
      ${this._renderCameraReveal(color)}
    `;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_TAG,
  name: "Status Button Card by akaDashe",
  description:
    "A customisable button card focused on entity status with state-based icons, colors, and labels",
  preview: true,
});
