/* global window */
import {
  THEME,
  CATEGORY_SPACE_OBJECTS,
  EVENT_SPACE_OBJECT_SELECTED,
  EVENT_SPACE_OBJECT_SELECTION_CANCELED,
  GUI_PANEL_HEIGHT,
} from '../../helpers/consts';
import EventEmitter from '../../helpers/EventEmitter';
import Selector from '../../helpers/Selector';
import SpaceObjectsList from '../elements/SpaceObjectsList';
import Exporter from '../../helpers/Exporter';

const ns = window.fivenations;
const gameWidth = ns.window.width;
const gameHeight = ns.window.height;
const width = 400;
const height = gameHeight;
const offsetExpadend = gameWidth - width;
const offsetClosed = gameWidth;
const placementWindow = {
  width: gameWidth,
  height: gameHeight - GUI_PANEL_HEIGHT,
};

let expanded = false;
let animating = false;
let selectionSprite;
let selectedSpaceObject;

const openStarfieldButton = {
  id: 'openStarfieldButton',
  text: 'Starfield',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: -120 + gameWidth,
    y: 82,
  },
  width: 120,
  height: 40,
};

const closeStarfieldButton = {
  id: 'closeStarfieldButton',
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

const resetStarfieldSelectionButton = {
  id: 'resetStarfieldSelectionButton',
  text: 'Reset',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  position: {
    x: 46,
    y: 6,
  },
  width: 75,
  height: 40,
};

const spaceObjectsAttributesHeader = {
  id: 'spaceObjectsAttriutesHeader',
  text: 'Placement attributes',
  font: {
    size: '20px',
    family: 'Arial',
  },
  component: 'Label',
  position: {
    x: 0,
    y: 0,
  },
  width,
  height: 30,
};

const spaceObjectsAttributes = {
  component: 'Layout',
  padding: 3,
  position: 'center',
  width: width - 15,
  height: 100,
  layout: [2, 2],
  children: [
    {
      id: 'spaceObjectsAttributeZLabel',
      text: 'Depth (Deep - Swallow)',
      font: {
        size: '16px',
        family: 'Arial',
      },
      component: 'Label',
      position: 'center',
      width: 50,
      height: 30,
    },
    {
      id: 'spaceObjectsAttributeZ',
      component: 'Slider',

      slide: { width: 30, height: 40 },
      position: 'top left',
      width: 175,
      height: 30,
    },
    {
      id: 'spaceObjectsAttributeScaleLabel',
      text: 'Scale (Normal - Double)',
      font: {
        size: '16px',
        family: 'Arial',
      },
      component: 'Label',
      position: 'center',
      width: 50,
      height: 30,
    },
    {
      id: 'spaceObjectsAttributeScale',
      component: 'Slider',

      slide: { width: 30, height: 40 },
      position: 'top left',
      width: 175,
      height: 30,
    },
  ],
};

const spaceObjectsListHeader = {
  id: 'spaceObjectsListHeader',
  text: 'Starfield objects',
  font: {
    size: '20px',
    family: 'Arial',
  },
  component: 'Label',
  position: {
    x: 0,
    y: 0,
  },
  width,
  height: 30,
};

const StarfieldWindow = {
  id: 'StarfieldWindow',
  component: 'Window',
  header: {
    id: 'ttl',
    skin: 'blueheader',
    position: {
      x: 0,
      y: 0,
    },
    height: 40,
    text: 'Starfield',
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
  children: [
    {
      id: 'entitiesHeaderButtonsLayout',
      component: 'Layout',
      position: 'top left',
      padding: 3,
      width: width - 15,
      height: 60,
      layout: [10, 1],
      children: [closeStarfieldButton, resetStarfieldSelectionButton],
    },
    spaceObjectsAttributesHeader,
    spaceObjectsAttributes,
    null,
    spaceObjectsListHeader,
    SpaceObjectsList.getGUIDefinition(),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
};

function toogleWindow(EZGUI, phaserGame) {
  if (animating) return;
  const targetCoord = expanded ? offsetClosed : offsetExpadend;
  const tween = phaserGame.add.tween(EZGUI.components.StarfieldWindow).to(
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

function placeSpaceObject(game, config) {
  const layer = game.map.getStarfield().getDeepSpaceLayer();
  const spaceObjectConfig = {
    ...config,
  };

  // visualises the new object on the Map component
  layer.add(config);
  game.map.forceRefresh();

  // saves the relevant configuration details for later export
  Exporter.getInstance().addSpaceObject(spaceObjectConfig);
}

function addPlacementListener(game, EZGUI, phaserGame) {
  game.userPointer.on('leftbutton/down', (mousePointer) => {
    const coords = mousePointer.getScreenCoords();
    const selector = Selector.getInstance();
    const z = EZGUI.components.spaceObjectsAttributeZ.value * 0.9 + 0.1;
    const scale = EZGUI.components.spaceObjectsAttributeScale.value + 1;

    if (coords.x >= placementWindow.width) return;
    if (coords.y >= placementWindow.height) return;
    if (!selector.isActive()) return;
    if (selector.getCategory() !== CATEGORY_SPACE_OBJECTS) return;

    placeSpaceObject(game, {
      id: selector.getId(),
      x: coords.x + phaserGame.camera.x * z,
      y: coords.y + phaserGame.camera.y * z,
      z,
      scale,
    });
  });
}

function isMouseOverSpaceObject(pointer, spaceObject, phaserGame) {
  const width = spaceObject.sprite.width;
  const height = spaceObject.sprite.height;
  const x = spaceObject.x - width / 2 - phaserGame.camera.x * spaceObject.z;
  const y = spaceObject.y - height / 2 - phaserGame.camera.y * spaceObject.z;
  return (
    pointer.x >= x &&
    pointer.x <= x + width &&
    pointer.y >= y &&
    pointer.y <= y + height
  );
}

function addSelectSpaceObjectListener(game, phaserGame) {
  game.userPointer.on('leftbutton/down', (mousePointer) => {
    const selector = Selector.getInstance();
    if (selector.isActive()) return;

    const pointer = mousePointer.getRealCoords();
    const starfield = game.map.getStarfield();
    const deepSpaceLayer = starfield.getDeepSpaceLayer();
    const spaceObjects = deepSpaceLayer.spaceObjects;

    pointer.x -= phaserGame.camera.x;
    pointer.y -= phaserGame.camera.y;

    for (let i = spaceObjects.length - 1; i >= 0; i -= 1) {
      if (isMouseOverSpaceObject(pointer, spaceObjects[i], phaserGame)) {
        EventEmitter.getInstance().emit(
          EVENT_SPACE_OBJECT_SELECTED,
          spaceObjects[i],
        );
        return;
      }
    }

    EventEmitter.getInstance().emit(EVENT_SPACE_OBJECT_SELECTION_CANCELED);
  });
}

function createSelectionSprite(game) {
  const width = 100;
  const height = 100;
  // create a new bitmap data object
  const bmd = game.add.bitmapData(width, height);

  // draw to the canvas context like normal
  bmd.ctx.beginPath();
  bmd.ctx.lineWidth = 5;
  bmd.ctx.strokeStyle = 'blue';
  bmd.ctx.rect(0, 0, width, height);
  bmd.ctx.stroke();

  // use the bitmap data as the texture for the sprite
  selectionSprite = game.add.sprite(0, 0, bmd);
  selectionSprite.anchor.setTo(0.5, 0.5);
  selectionSprite.visible = false;
}

function addSelectionListeners(game) {
  const eventEmitter = EventEmitter.getInstance();
  eventEmitter.on(EVENT_SPACE_OBJECT_SELECTED, (spaceObject) => {
    const sprite = spaceObject.sprite;
    const scaleX = sprite.width / 100;
    const scaleY = sprite.height / 100;

    selectionSprite.visible = true;
    selectionSprite.scale.setTo(scaleX, scaleY);
    spaceObject.sprite.addChild(selectionSprite);
    selectedSpaceObject = spaceObject;
    game.map.forceRefresh();
  });

  eventEmitter.on(EVENT_SPACE_OBJECT_SELECTION_CANCELED, () => {
    if (selectionSprite.visible) {
      game.map.forceRefresh();
    }
    selectionSprite.visible = false;
  });
}

function addRemoveSpaceObjectListener(game, phaserGame) {
  game.userKeyboard.on('key/delete', () => {
    if (!selectedSpaceObject) return;
    removeSpaceObject(game, selectedSpaceObject);
    Exporter.getInstance().removeSpaceObject(selectedSpaceObject);
    selectedSpaceObject = null;
  });
}

function removeSpaceObject(game, spaceObject) {
  const starfield = game.map.getStarfield();
  const deepSpaceLayer = starfield.getDeepSpaceLayer();
  const spaceObjects = deepSpaceLayer.spaceObjects;
  for (let i = spaceObjects.length - 1; i >= 0; i--) {
    if (spaceObjects[i] === spaceObject) {
      spaceObjects.splice(i, 1);
      game.map.forceRefresh();
      return;
    }
  }
}

function addWindowListeners(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();
  const openButton = EZGUI.components.openStarfieldButton;
  const closeButton = EZGUI.components.closeStarfieldButton;
  const resetButton = EZGUI.components.resetStarfieldSelectionButton;

  eventEmitter.on('windowOpened', () => {
    openButton.visible = false;
  });

  eventEmitter.on('windowClosed', () => {
    openButton.visible = true;
  });

  openButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowOpened');
  });

  closeButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowClosed');
  });

  resetButton.on('click', () => {
    Selector.getInstance().reset();
  });

  eventEmitter.on('windowOpened', () => {
    placementWindow.width = gameWidth - width;
  });

  eventEmitter.on('windowClosed', () => {
    placementWindow.width = gameWidth - openStarfieldButton.width;
  });
}

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();

  // generates the Pixi GUI objects
  EZGUI.create(StarfieldWindow, THEME);
  EZGUI.create(openStarfieldButton, THEME);

  // basic listeners to make the window togglable
  addWindowListeners(game, EZGUI, phaserGame);

  // selection sprite that is added to the selected space objects
  createSelectionSprite(game);

  // adds listeners to mouse click to select space objects
  addSelectSpaceObjectListener(game, phaserGame);
  addSelectionListeners(game);

  // adds listeners to mouse click to place space object onto the map
  addPlacementListener(game, EZGUI, phaserGame);
  addRemoveSpaceObjectListener(game, phaserGame);

  // external components
  SpaceObjectsList.addEventListeners(game, EZGUI, phaserGame);
}

export default {
  create,
};
