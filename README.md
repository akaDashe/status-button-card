# Dashe Status Button Card

[![HACS][hacs-badge]][hacs-url]
[![Build][build-badge]][build-url]
[![License][license-badge]](LICENSE)

A customisable button card for [Home Assistant](https://www.home-assistant.io/) focused on entity status. State-based icons, colors, labels, and animations give you at-a-glance visibility of your devices.

## Features

- State-based icon, color, and label per entity
- Built-in domain defaults for lock, light, switch, cover, climate, media player, alarm, and more
- Transitional state animations (e.g. locking/unlocking blink)
- Secondary entity support (e.g. door sensor paired with a lock)
- Custom state appearance overrides
- Configurable tap, double-tap, and hold actions
- Full visual editor matching native Home Assistant UI
- Adjustable sizing (width, height, icon size)

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to **Frontend** > **+ Explore & Download Repositories**
3. Search for **Dashe Status Button Card**
4. Click **Download**
5. Restart Home Assistant

### Manual

1. Download `dashe-status-button-card.js` from the [latest release](../../releases/latest)
2. Copy it to `config/www/dashe-status-button-card/`
3. Add the resource in **Settings > Dashboards > Resources**:
   - URL: `/local/dashe-status-button-card/dashe-status-button-card.js`
   - Type: JavaScript Module

## Usage

### Visual Editor

Add the card via the UI editor — all options are configurable through the visual editor with collapsible sections for Entity, Appearance, State Overrides, Sizing, and Actions.

### YAML

```yaml
type: custom:dashe-status-button-card
entity: lock.front_door
```

### Full Example

```yaml
type: custom:dashe-status-button-card
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
  - type: custom:dashe-status-button-card
    entity: lock.front_door
  - type: custom:dashe-status-button-card
    entity: light.living_room
  - type: custom:dashe-status-button-card
    entity: alarm_control_panel.home
  - type: custom:dashe-status-button-card
    entity: cover.blinds
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
| `state_appearances` | list | | Per-state icon/label/color overrides |
| `min_width` | string | `68px` | Minimum button width |
| `max_width` | string | `85px` | Maximum button width |
| `height` | string | `68px` | Button height |
| `icon_size` | string | `26px` | Icon size |
| `tap_action` | object | `more-info` | Action on tap |
| `double_tap_action` | object | `none` | Action on double tap |
| `hold_action` | object | `none` | Action on hold |

### State Appearance Options

| Option | Type | Description |
|---|---|---|
| `state` | string | State value to match. Prefix with `secondary:` for secondary entity |
| `icon` | string | Icon override for this state |
| `label` | string | Label override for this state |
| `color` | string | Color override for this state |
| `animate` | boolean | Enable blink animation for this state |

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

## License

[MIT](LICENSE)

[hacs-badge]: https://img.shields.io/badge/HACS-Default-41BDF5.svg
[hacs-url]: https://github.com/hacs/integration
[build-badge]: https://img.shields.io/github/actions/workflow/status/dashe/dashe-status-button-card/build.yml?branch=main
[build-url]: https://github.com/akaDashe/dashe-status-button-card/actions/workflows/build.yml
[license-badge]: https://img.shields.io/github/license/dashe/dashe-status-button-card
