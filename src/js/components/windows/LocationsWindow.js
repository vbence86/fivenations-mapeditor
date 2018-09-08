/* global window, alert */
import {
  THEME,
  CATEGORY_LOCATION,
  EVENT_LOCATION_SELECTED,
  EVENT_EFFECT_SELECTION_CANCELED,
  EVENT_LOCATION_SELECTION_CANCELED,
  EVENT_SPACE_OBJECT_SELECTION_CANCELED,
  EVENT_ENTITY_SELECTION_CANCELED,
} from '../../helpers/consts';
import Utils from '../../helpers/Utils';
import Exporter from '../../helpers/Exporter';
import Importer from '../../helpers/Importer';
import EventEmitter from '../../helpers/EventEmitter';
import Selector from '../../helpers/Selector';
import LocationManager from '../../helpers/LocationManager';

const ns = window.fivenations;
const gameWidth = ns.window.width;
const gameHeight = ns.window.height;
const width = 400;
const height = gameHeight;
const offsetExpadend = gameWidth - width;
const offsetClosed = gameWidth;
const hLayoutBlock = 64;
const placementWindow = {
  width: gameWidth,
  height: gameHeight,
};

let expanded = false;
let animating = false;

const openLocationWindowButton = {
  id: 'openLocationWindowButton',
  text: 'Locations',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: -120 + gameWidth,
    y: 246,
  },
  width: 120,
  height: 40,
};

const closeLocationWindowButton = {
  id: 'closeLocationWindowButton',
  text: 'X',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: 6,
    y: 6,
  },
  width: 40,
  height: 40,
};

const addLocationButton = {
  id: 'addLocationButton',
  text: 'Add New Location',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: 0,
    y: 0,
  },
  width: 175,
  height: 40,
};

const LocationsWindow = {
  id: 'LocationsWindow',
  component: 'Window',
  header: {
    id: 'ttl',
    skin: 'blueheader',
    position: {
      x: 0,
      y: 0,
    },
    height: 40,
    text: 'Map Settings',
  },
  draggable: true,
  padding: 4,
  position: {
    x: gameWidth,
    y: 0,
  },
  width,
  height,
  layout: [1, 12], // one layout block is 64px
  children: [closeLocationWindowButton, addLocationButton],
};

function toogleWindow(EZGUI, phaserGame) {
  if (animating) return;
  const targetCoord = expanded ? offsetClosed : offsetExpadend;
  const tween = phaserGame.add.tween(EZGUI.components.LocationsWindow).to(
    {
      x: targetCoord,
    },
    250,
    'Cubic',
    true,
  );
  tween.onComplete.add(() => {
    animating = false;
  });
  expanded = !expanded;
  animating = true;
}

function toogleLocations() {
  const manager = LocationManager.getInstance();
  if (expanded) {
    manager.showAll();
  } else {
    manager.hideAll();
  }
}

function addLocationButtonListener(game, EZGUI) {
  const emitter = EventEmitter.getInstance();
  EZGUI.components.addLocationButton.on('click', () => {
    const selector = Selector.getInstance();
    selector.reset();
    selector.select({ id: 0, category: CATEGORY_LOCATION });
  });
}

function addPlacementListener(game, EZGUI, phaserGame) {
  game.userPointer.on('multiselector/up', (coords) => {
    const selector = Selector.getInstance();
    const tabWidth = expanded ? width : 0;

    if (ns.noInputOverlay) return;

    if (coords.x - phaserGame.camera.x >= placementWindow.width) return;
    if (coords.y - phaserGame.camera.y >= placementWindow.height) return;
    // minimap
    if (
      coords.x - phaserGame.camera.x <= 182 &&
      coords.y - phaserGame.camera.y > placementWindow.height - 178
    ) {
      return;
    }
    if (!selector.isActive()) return;
    if (selector.getCategory() !== CATEGORY_LOCATION) return;

    placeLocation(coords);
    selector.reset();
  });
}

function placeLocation(coords) {
  const manager = LocationManager.getInstance();
  const location = manager.add(coords);
  Exporter.getInstance().addLocation({
    id: location.getId(),
    ...coords,
  });
}

function isMouseOverLocation(pointer, location) {
  const coords = location.getCoords();
  const {
    x, y, width, height,
  } = coords;
  return (
    pointer.x >= x &&
    pointer.x <= x + width &&
    pointer.y >= y &&
    pointer.y <= y + height
  );
}

function addSelectLocationListener(game, phaserGame) {
  const entityManager = ns.game.entityManager;
  const exporter = Exporter.getInstance();
  const local = EventEmitter.getInstance();

  game.userPointer.on('leftbutton/down', (mousePointer) => {
    const locationsWindow = EZGUI.components.LocationsWindow;
    const selector = Selector.getInstance();
    const manager = LocationManager.getInstance();

    if (!expanded) return;

    // selection functionality must be disabled if there is an
    // overlay window above the game stage
    if (ns.noInputOverlay) return;

    const pointer = mousePointer.getRealCoords();
    const locations = manager.getLocations();

    for (let i = locations.length - 1; i >= 0; i -= 1) {
      const location = locations[i];
      if (isMouseOverLocation(pointer, location)) {
        local.emit(EVENT_LOCATION_SELECTED, location);
        local.emit(EVENT_EFFECT_SELECTION_CANCELED);
        local.emit(EVENT_SPACE_OBJECT_SELECTION_CANCELED);
        local.emit(EVENT_ENTITY_SELECTION_CANCELED);
        return;
      }
    }

    local.emit(EVENT_LOCATION_SELECTION_CANCELED);
  });
}

function addSelectionListeners() {
  const eventEmitter = EventEmitter.getInstance();
  const manager = LocationManager.getInstance();
  eventEmitter.on(EVENT_LOCATION_SELECTED, (location) => {
    manager.unselectAll();
    location.select();
  });

  eventEmitter.on(EVENT_LOCATION_SELECTION_CANCELED, () => {
    manager.unselectAll();
  });
}

function addRemoveLocationListener(game) {
  const eventEmitter = ns.game.eventEmitter;
  const manager = LocationManager.getInstance();

  game.userKeyboard.on('key/delete', () => {
    const selectedLocation = manager.getSelected();
    if (!selectedLocation) return;
    Exporter.getInstance().removeLocation(selectedLocation);
    manager.delete(selectedLocation);
  });
}

function addWindowListeners(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();
  const openButton = EZGUI.components.openLocationWindowButton;
  const closeButton = EZGUI.components.closeLocationWindowButton;

  eventEmitter.on('windowOpened', () => {
    openButton.visible = false;
    placementWindow.width = gameWidth - width;
  });

  eventEmitter.on('windowClosed', () => {
    openButton.visible = true;
    placementWindow.width = gameWidth - openButton.width;
  });

  openButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    toogleLocations();
    eventEmitter.emit('windowOpened');
  });

  closeButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    toogleLocations();
    Selector.getInstance().reset();
    eventEmitter.emit('windowClosed');
  });
}

function create(game, EZGUI, phaserGame) {
  EZGUI.create(LocationsWindow, THEME);
  EZGUI.create(openLocationWindowButton, THEME);

  addLocationButtonListener(game, EZGUI);
  addPlacementListener(game, EZGUI, phaserGame);
  addSelectLocationListener(game);
  addRemoveLocationListener(game);
  addSelectionListeners();
  addWindowListeners(game, EZGUI, phaserGame);
}

export default {
  create,
};
