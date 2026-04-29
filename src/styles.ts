import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    border: none;
    box-shadow: none !important;
    background: none !important;
    overflow: visible;
    padding: var(--dsb-padding, 4px 0 8px) !important;
    width: var(--dsb-width, 100%);
    min-width: var(--dsb-min-width, 68px);
    max-width: var(--dsb-max-width, none);
    height: var(--dsb-height, 68px);
    margin: 0;
    border-radius: 0 !important;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    box-sizing: border-box;
  }

  .button-layout {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    height: 100%;
    padding-bottom: 5px;
  }

  .btn-icon {
    --mdc-icon-size: var(--dsb-icon-size, 26px);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
  }

  .btn-icon.animate {
    animation: blink 1s ease infinite;
  }

  .btn-icon.animate ha-icon {
    animation: blink 1s ease infinite;
  }

  .btn-name {
    font-size: 12px;
    color: var(--dsb-name-color, rgb(130, 130, 130));
    margin-top: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .btn-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    transition: color 0.3s ease;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  /*
   * Outer wrapper:
   *   - Spans full viewport width for an edge-to-edge feel.
   *   - margin-left = -hostX shifts it to the viewport's left edge.
   *   - max-height drives in-flow height for the slide animation.
   *   - JS sets --dsb-host-offset-x and --dsb-pointer-x on every render/resize.
   */
  .camera-reveal-wrapper {
    /* Width = the host's column width (set by JS); falls back to viewport. */
    width: var(--dsb-column-width, 100vw);
    margin-left: var(--dsb-host-offset-x, 0px);
    /* Padding moved to .camera-reveal so the pointer stays in unpadded
       coordinates and aligns correctly with the button. */
    max-height: 0;
    overflow: hidden;
    transition:
      max-height 600ms cubic-bezier(0.16, 1, 0.3, 1),
      margin-top 600ms cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }

  .camera-reveal-wrapper.open {
    max-height: var(--dsb-reveal-max-height, 720px);
    margin-top: 0;
    pointer-events: auto;
  }

  /* Pointer triangle that visually anchors the reveal to the button.
     Slides + fades on the same curve as the camera reveal below it. */
  .camera-pointer {
    position: relative;
    height: 8px;
    overflow: visible;
    transform: translateY(-24px);
    opacity: 0;
    transition:
      transform 600ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 600ms ease;
  }

  .camera-reveal-wrapper.open > .camera-pointer {
    transform: translateY(0);
    opacity: 1;
  }

  .camera-pointer::before {
    content: "";
    position: absolute;
    left: var(--dsb-pointer-x, 50%);
    top: 0;
    transform: translateX(-50%);
    width: 28px;
    height: 8px;
    background: var(--dsb-pointer-color, currentColor);
    /* Apex at top (touching button), wide base at bottom (opening into cameras) */
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  }

  /* Inner content: vertical stack, framed with a colored border + rounded corners. */
  .camera-reveal {
    margin: 0 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    overflow: hidden;
    min-height: 0;
    border: 3px solid var(--dsb-pointer-color, currentColor);
    border-radius: 14px;
    transform: translateY(-24px);
    opacity: 0;
    transition:
      transform 600ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 600ms ease;
  }

  .camera-reveal-wrapper.open > .camera-reveal {
    transform: translateY(0);
    opacity: 1;
  }

  .camera-panel {
    position: relative;
    width: 100%;
    /* Each panel uses its own aspect ratio (set inline per camera);
       defaults to 16/9 if not specified. */
    aspect-ratio: var(--dsb-camera-aspect, 16 / 9);
    /* Cap individual panel height so portrait cameras don't dominate. */
    max-height: 60vh;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.6);
  }

  /* Inner wrapper for the camera media — fades in once the video is fitted. */
  .camera-media {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 100ms ease;
  }

  .camera-panel.fit-ready .camera-media {
    opacity: 1;
  }

  /* Spinner shown while the camera connects + initial frame is fitted. */
  .camera-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    margin: -16px 0 0 -16px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: var(--dsb-pointer-color, currentColor);
    border-radius: 50%;
    animation: dsb-spin 800ms linear infinite;
    opacity: 1;
    transition: opacity 100ms ease;
    pointer-events: none;
  }

  .camera-panel.fit-ready .camera-spinner {
    opacity: 0;
  }

  @keyframes dsb-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .camera-panel hui-image {
    width: 100%;
    height: 100%;
  }

  /* Force any rendered image/video inside the camera panel to crop-fit
     (object-fit: cover) so the camera image doesn't distort when the
     configured aspect ratio differs from the camera's native one. */
  .camera-panel hui-image img,
  .camera-panel hui-image video,
  .camera-panel img,
  .camera-panel video {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  /* Horizontal separator between stacked cameras (matches border color) */
  .camera-panel + .camera-panel {
    border-top: 3px solid var(--dsb-pointer-color, currentColor);
  }

  .camera-panel hui-image {
    display: block;
    width: 100%;
    height: 100%;
  }

  :host {
    position: relative;
    overflow: visible;
  }
`;
