# Status Button Card by akaDashe

[![HACS][hacs-badge]][hacs-url]
[![Build][build-badge]][build-url]
[![License][license-badge]](LICENSE)

> **Beta** — This card is in active development. Features and configuration may change before the 1.0.0 stable release.

A customisable button card for [Home Assistant](https://www.home-assistant.io/) focused on entity status. State-based icons, colors, labels, and animations give you at-a-glance visibility of your devices.

## Features

- State-based icon, color, and label per entity
- Built-in domain defaults for lock, light, switch, cover, climate, media player, alarm, and more
- Transitional state animations (e.g. locking/unlocking blink)
- Secondary entity support (e.g. door sensor paired with a lock)
- Custom state appearance overrides — pick from the entity's known states (or `secondary:` prefix for the secondary entity) via a dropdown, with free-text fallback for template values
- Configurable tap, double-tap, and hold actions via Home Assistant's native action editor
- **Camera reveal** — slide cameras down from the button when a configured state is active, with sync slide animation, configurable aspect ratio, fit mode (cover/contain), and position per camera
- Visual editor built on Home Assistant's `ha-form` schema — matches the look and feel of HA's built-in card editors

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to **Frontend** > **+ Explore & Download Repositories**
3. Search for **Status Button Card by akaDashe**
4. Click **Download**
5. Restart Home Assistant

### Manual

1. Download `status-button-card.js` from the [latest release](../../releases/latest)
2. Copy it to `config/www/status-button-card/`
3. Add the resource in **Settings > Dashboards > Resources**:
   - URL: `/local/status-button-card/status-button-card.js`
   - Type: JavaScript Module

## Usage

### Visual Editor

Add the card via the UI editor. The editor uses Home Assistant's `ha-form` schema, so it inherits HA's native styling, lazy element loading, and accessibility behaviour. Layout: top-level Entity + Secondary Entity, collapsible **Appearance** and **Actions** sections, plus a **State Overrides** list where each override expands to its own form (state value as a dropdown, icon, label, color, blink toggle, and an optional camera reveal list).

### YAML

```yaml
type: custom:status-button-card
entity: lock.front_door
```

### Full Example

```yaml
type: custom:status-button-card
entity: lock.front_door
secondary_entity: binary_sensor.front_door_contact
name: Front Door
icon: mdi:door-closed-lock
show_name: true
show_label: true
active_color: "rgba(46, 175, 80, 0.9)"
inactive_color: "rgba(244, 67, 54, 1)"
transitional_color: "rgba(255, 170, 0, 1)"
state_appearances:
  - state: locked
    icon: mdi:lock
    label: Locked
    color: "rgba(46, 175, 80, 0.9)"
  - state: unlocked
    icon: mdi:lock-open
    label: Unlocked
    color: "rgba(244, 67, 54, 1)"
  - state: locking
    icon: mdi:lock-clock
    label: Locking...
    animate: true
  - state: "secondary:on"
    icon: mdi:door-open
    label: Door Open
    color: "rgba(255, 170, 0, 1)"
tap_action:
  action: toggle
hold_action:
  action: more-info
```

### Horizontal Row Layout

Use inside a `horizontal-stack` for a status bar:

```yaml
type: horizontal-stack
cards:
  - type: custom:status-button-card
    entity: lock.front_door
  - type: custom:status-button-card
    entity: light.living_room
  - type: custom:status-button-card
    entity: alarm_control_panel.home
  - type: custom:status-button-card
    entity: cover.blinds
```

### Thermostat With Numeric Thresholds

Numeric comparison operators light up the right color band. **Order matters** — the highest-specificity bucket comes first, otherwise a 75°F reading would match `> 65` before reaching `> 75`:

```yaml
type: custom:status-button-card
entity: sensor.living_room_temperature
name: Living Room
state_appearances:
  - state: ">= 80"
    color: "rgba(244, 67, 54, 1)"   # red
    label: HOT
    icon: mdi:thermometer-high
  - state: ">= 75"
    color: "rgba(255, 170, 0, 1)"   # orange
    label: WARM
    icon: mdi:thermometer
  - state: ">= 65"
    color: "rgba(46, 175, 80, 0.9)" # green
    label: COMFY
    icon: mdi:thermometer
  - state: "< 65"
    color: "rgba(33, 150, 243, 1)"  # blue
    label: COLD
    icon: mdi:snowflake
  - state: "!= unavailable"          # numeric ops won't match unavailable; this is a safety net
    icon: mdi:help-circle-outline
```

### Alarm Panel With Regex

A single regex collapses every `armed_*` state into one rule. The bare `disarmed` and `triggered` fall through to their own rules:

```yaml
type: custom:status-button-card
entity: alarm_control_panel.home
state_appearances:
  - state: triggered
    color: "rgba(244, 67, 54, 1)"
    label: TRIGGERED
    animate: true
  - state: "~= ^armed"               # armed_home, armed_away, armed_night, armed_vacation, armed_custom_bypass
    color: "rgba(46, 175, 80, 0.9)"
    icon: mdi:shield-check
    label: ARMED
  - state: "~= ^(arming|pending|disarming)"
    color: "rgba(255, 170, 0, 1)"
    animate: true
  - state: disarmed
    color: "rgba(244, 67, 54, 1)"
    label: DISARMED
    icon: mdi:shield-off
```

### Camera On Motion (Secondary Entity)

Lock paired with a motion sensor. The lock's appearance follows its primary state; the camera reveals when the **secondary** motion sensor fires, regardless of lock state:

```yaml
type: custom:status-button-card
entity: lock.front_door
secondary_entity: binary_sensor.porch_motion
state_appearances:
  - state: "secondary:on"            # motion detected
    cameras:
      - entity: camera.porch
        aspect_ratio: 16/9
        object_fit: cover
  - state: locked
    icon: mdi:lock
    color: "rgba(46, 175, 80, 0.9)"
  - state: unlocked
    icon: mdi:lock-open
    color: "rgba(244, 67, 54, 1)"
```

## Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | **Required** | Primary entity ID |
| `secondary_entity` | string | | Optional secondary entity (e.g. door contact sensor) |
| `name` | string | Entity name | Display name |
| `icon` | string | Domain default | Default icon (mdi:icon-name) |
| `show_name` | boolean | `true` | Show the name label |
| `show_label` | boolean | `true` | Show the state label |
| `active_color` | string | Domain default | Color when entity is active |
| `inactive_color` | string | Domain default | Color when entity is inactive |
| `transitional_color` | string | Domain default | Color during transitional states |
| `state_appearances` | list | | Per-state icon/label/color/cameras overrides |
| `tap_action` | object | `more-info` | Action on tap |
| `double_tap_action` | object | `none` | Action on double tap |
| `hold_action` | object | `none` | Action on hold |
| `min_width` | string | `68px` | Minimum button width (YAML only) |
| `max_width` | string | `none` | Maximum button width (YAML only) |
| `height` | string | `68px` | Button height (YAML only) |
| `icon_size` | string | `26px` | Icon size (YAML only) |

### State Appearance Options

| Option | Type | Description |
|---|---|---|
| `state` | string | Pattern to match the entity's state (see [State Patterns](#state-patterns)). Prefix with `secondary:` to match against the secondary entity |
| `icon` | string | Icon override for this state |
| `label` | string | Label override for this state |
| `color` | string | Color override for this state |
| `animate` | boolean | Enable blink animation for this state |
| `cameras` | list | Cameras to reveal when this state is active (see Camera Reveal) |

### State Patterns

The `state` field accepts comparison operators in addition to exact matches. Useful for sensors with numeric values, "anything but unavailable" guards, or regex matches across whole state families:

| Pattern | Matches |
|---|---|
| `locked` | exact string match (default when no operator is given) |
| `= idle` | explicit equals — same as bare `idle` |
| `!= unavailable` | not equal |
| `> 2`, `>2` | numeric greater-than (entity state coerced via `Number()`) |
| `>= 2` | numeric greater-or-equal |
| `< 100`, `<= 50` | numeric less-than / less-or-equal |
| `~= ^armed` | regex test against the state string |
| `secondary:>50` | any operator works with the `secondary:` prefix |

> [!IMPORTANT]
> **Order is priority.** Rules are evaluated top-to-bottom and the **first one that matches wins** — all subsequent rules are ignored for that state. List more-specific patterns above broader ones.
>
> For example, to color a sensor amber when above 30 and red when above 60, the `> 60` rule must come **before** the `> 30` rule. If you put `> 30` first, a state of `75` matches it and you'll see amber, never red.
>
> In the visual editor, **drag the grip handle** on the left of each row to reorder. In YAML, the list order is the priority order.

Other notes:
- Numeric operators against non-numeric states (`unavailable`, `unknown`, `on`) never match — they fall through to the next rule.
- An invalid regex returns false rather than throwing — the rule simply doesn't match.

```yaml
state_appearances:
  - state: "!= unavailable"          # primary entity reachable
    icon: mdi:thermometer
  - state: "> 30"                    # hot
    color: rgba(244, 67, 54, 1)
    label: "HOT"
  - state: "~= ^armed"               # any armed_* state
    icon: mdi:shield-check
```

### Camera Reveal

When a state appearance has a non-empty `cameras` list, that list of cameras slides down underneath the button while the state is active. The reveal slides back up automatically when the state changes. A small triangular pointer in the active state's color anchors the reveal to the button that triggered it.

Each camera entry can be a string (just the entity ID) or an object with extra options:

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | **Required** | Camera entity ID. Use a streaming-capable entity (e.g. from HA's native Ring integration) for live video — `ha-camera-stream` is rendered automatically when the entity supports streaming |
| `aspect_ratio` | string | `16 / 9` | Frame aspect ratio for this camera (e.g. `16 / 9`, `9 / 16`, `4 / 3`) |
| `object_fit` | `cover` \| `contain` | `cover` | `cover` crops the video to fill the frame, `contain` letterboxes it |
| `object_position` | string | `center` | Where the video sits inside the frame when its aspect doesn't match the frame's. One of `center`, `top`, `bottom`, `left`, `right` |

Example — alarm panel that reveals two cameras when armed:

```yaml
type: custom:status-button-card
entity: alarm_control_panel.house
state_appearances:
  - state: armed_home
    icon: mdi:shield-home
    cameras:
      - entity: camera.front_door
      - entity: camera.driveway
  - state: armed_away
    icon: mdi:shield-lock
    cameras:
      - entity: camera.front_door
        aspect_ratio: 4 / 3
        object_fit: cover
        object_position: bottom
      - entity: camera.driveway
```

### Action Options

| Option | Type | Description |
|---|---|---|
| `action` | string | `more-info`, `toggle`, `navigate`, `call-service`, `perform-action`, `url`, `none` |
| `navigation_path` | string | Path for `navigate` action |
| `url_path` | string | URL for `url` action |
| `service` | string | Service for `call-service` action (e.g. `lock.unlock`) |
| `service_data` | object | Data to pass to service call |

## Supported Domains

The card includes built-in icon and color defaults for: `light`, `switch`, `climate`, `media_player`, `cover`, `lock`, `camera`, `sensor`, `binary_sensor`, `fan`, `vacuum`, `person`, `device_tracker`, `alarm_control_panel`, `input_boolean`, `weather`.

## Development

```bash
npm install
npm run build       # Production build
npm run watch       # Development with auto-rebuild
npm test            # Run tests
npm run test:watch  # Watch mode
npm run lint        # ESLint
npm run format      # Prettier
```

### Local deploy to Home Assistant

If you mount your HA config at `/Volumes/config` (e.g. via SMB), `npm run push` builds, deploys, and busts every cache layer:

```bash
npm run deploy   # build + copy to /Volumes/config/www/community/status-button-card/
npm run dev      # rollup watch + auto-deploy on every save
npm run bump     # point the Lovelace resource at the freshly hashed filename
npm run push     # deploy && bump in one go
```

The deploy emits **two** files: the canonical `status-button-card.js` (which HACS validates against) and a content-hashed `status-button-card.<hash>.js`. The bump script reads `dist/.deploy-hash` and points the Lovelace resource URL at the hashed filename, so every build produces a brand-new URL that no browser cache, HA service worker, or Lovelace resource list can serve stale. Old hashed siblings are pruned on each deploy.

`bump-resource.py` reads `HA_URL` and `HA_TOKEN` from `<repo>/../.env`. Override the resource match with `--name foo` or `RESOURCE_NAME=foo`. If `dist/.deploy-hash` is absent, it falls back to bumping a `?hacstag=` query.

## License

[MIT](LICENSE)

[hacs-badge]: https://img.shields.io/badge/HACS-Default-41BDF5.svg
[hacs-url]: https://github.com/hacs/integration
[build-badge]: https://img.shields.io/github/actions/workflow/status/akaDashe/status-button-card/build.yml?branch=main
[build-url]: https://github.com/akaDashe/status-button-card/actions/workflows/build.yml
[license-badge]: https://img.shields.io/github/license/akaDashe/status-button-card
