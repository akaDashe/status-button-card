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
    padding: var(--dsb-padding, 4px 2px 8px) !important;
    min-width: var(--dsb-min-width, 68px);
    max-width: var(--dsb-max-width, 85px);
    height: var(--dsb-height, 68px);
    margin: 0 -2px;
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
`;
