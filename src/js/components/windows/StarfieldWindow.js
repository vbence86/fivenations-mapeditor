/* global window */
import { THEME, CATEGORY_SPACE_OBJECTS } from '../../helpers/consts';
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
  height: gameHeight,
};

let expanded = false;
let animating = false;

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
    y: 41,
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
    const coords = mousePointer.getRealCoords();
    const selector = Selector.getInstance();
    const z = EZGUI.components.spaceObjectsAttributeZ.value * 0.9 + 0.1;
    const scale = EZGUI.components.spaceObjectsAttributeScale.value + 1;

    if (coords.x - phaserGame.camera.x >= placementWindow.width) return;
    if (!selector.isActive()) return;
    if (selector.getCategory() !== CATEGORY_SPACE_OBJECTS) return;

    placeSpaceObject(game, {
      id: selector.getId(),
      x: coords.x * z,
      y: coords.y * z,
      z,
      scale,
    });
  });
}

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();

  EZGUI.create(StarfieldWindow, THEME);
  EZGUI.create(openStarfieldButton, THEME);

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

  addPlacementListener(game, EZGUI, phaserGame);
  SpaceObjectsList.addEventListeners(game, EZGUI, phaserGame);
}

export default {
  create,
};
