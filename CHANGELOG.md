# Changelog

## 1.0.0-beta.2

### Features

- **Camera reveal** — slide one or more cameras down from a button when a configured state is active.
  - Cameras are configured per `state_appearance`. When the state is active, every camera in its `cameras` list reveals with a synchronized slide-down animation.
  - Live streaming via `<ha-camera-stream>` for entities that support it (e.g. HA's native Ring integration). Snapshot fallback via `hui-image` for non-streaming entities.
  - Per-camera **aspect ratio**, **object fit** (`cover` default, `contain` optional), and **object position** (`center`, `top`, `bottom`, `left`, `right`).
  - Loading spinner shown while WebRTC connects, hidden once the first frame is fitted.
  - Triangular pointer anchored to the triggering button's horizontal position, in the active state's color.
  - Reveal auto-sizes to the host's column container (works inside `horizontal-stack`, `vertical-stack`, `grid`, or `section` cards).
- Visual editor dropdowns swapped to native HTML `<select>` styled to match Home Assistant — fixes a long-standing issue where some dropdowns wouldn't accept clicks.

### Changes

- Card now fills 100% of its container width by default. `max-width: 85px` removed; `min-width: 68px` retained.
- Card horizontal padding/margin removed (`padding: 4px 0 8px`, `margin: 0`).
- Sizing controls (`min_width`, `max_width`, `height`, `icon_size`) removed from the visual editor. Still settable via YAML for power users.
- Removed `control` (live-stream switch) field from camera config — HA's streaming pipeline handles activation, no manual switch needed.
- Removed `camera_width`, `camera_aspect_ratio`, `camera_reveal_align` global config fields. Aspect/fit/position are now per-camera.

### Dev tooling

- `npm run deploy` — build + copy to `/Volumes/config/www/community/status-button-card/`
- `npm run dev` — rollup watch + auto-deploy on every save
- `npm run bump` — Python script that updates the Lovelace resource hacstag via WebSocket, busts browser cache without manual hard-refresh
- `npm run push` — `deploy && bump` in one go

## 1.0.0-beta.1

Initial public release.

- State-based icon, color, label, and animation per entity
- Domain defaults for lock, light, switch, cover, climate, media player, alarm, camera, and more
- Secondary entity support
- Visual editor with collapsible sections
- Configurable tap, double-tap, and hold actions
