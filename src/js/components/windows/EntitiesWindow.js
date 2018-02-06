/* global window, alert */
import {
  THEME,
  CATEGORY_ENTITIES,
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_MISC,
  GUI_PANEL_HEIGHT,
} from '../../helpers/consts';
import Utils from '../../helpers/Utils';
import Exporter from '../../helpers/Exporter';
import Selector from '../../helpers/Selector';
import EventEmitter from '../../helpers/EventEmitter';
import EntitiesTabs from '../elements/EntitiesTabs';

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
  height: gameHeight - GUI_PANEL_HEIGHT,
};

const tabButtonIds = [
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_MISC,
];

const defaultTabId = ENTITY_TAB_FEDERATION;

const tabButtonConfig = {
  width: 50,
  height: 40,
};

let expanded = false;
let animating = false;
const activeTab = ENTITY_TAB_FEDERATION;

const openEntitiesButton = {
  id: 'openEntitiesButton',
  text: 'Entities',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: -120 + gameWidth,
    y: 164,
  },
  width: 120,
  height: 40,
};

const closeEntitiesButton = {
  id: 'closeEntitiesButton',
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

const resetEntitiesSelectionButton = {
  id: 'resetEntitiesSelectionButton',
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

function createTabButton(id) {
  return {
    id: `entitiesWindowTabButton${id}`,
    text: id,
    font: {
      size: '14px',
      family: 'Arial',
    },
    component: 'Button',
    skin: 'bluebutton',
    position: 'top left',
    width: tabButtonConfig.width,
    height: tabButtonConfig.height,
  };
}

function createEntityTabLayout() {
  const buttonCount = tabButtonIds.length;
  return {
    id: 'entitiesWindowTabLayout',
    component: 'Layout',
    padding: 3,
    position: 'top left',
    width: (tabButtonConfig.width + 6) * buttonCount,
    height: tabButtonConfig.height + 6,
    layout: [buttonCount, 1],
    children: tabButtonIds.map(id => createTabButton(id)),
  };
}

const entitiesWindow = {
  id: 'entitiesWindow',
  component: 'Window',
  header: {
    id: 'ttl',
    skin: 'blueheader',
    position: {
      x: 0,
      y: 0,
    },
    height: 40,
    text: 'Entities',
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
      children: [closeEntitiesButton, resetEntitiesSelectionButton],
    },
    createEntityTabLayout(),
    EntitiesTabs.getGUIDefinition(ENTITY_TAB_FEDERATION),
    EntitiesTabs.getGUIDefinition(ENTITY_TAB_MISC),
    null,
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
  const tween = phaserGame.add.tween(EZGUI.components.entitiesWindow).to(
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

function toogleTab(tab, tabs) {
  tabs.forEach((obj) => {
    obj.x = 3;
    obj.y = 144;
    obj.visible = obj === tab;
  });
}

function addEventListenersToTabButtons(EZGUI) {
  const tabs = tabButtonIds.map(id => EZGUI.components[`entitiesTab${id}`]);
  const buttons = tabButtonIds.map(id => EZGUI.components[`entitiesWindowTabButton${id}`]);

  const defaultTab = EZGUI.components[`entitiesTab${defaultTabId}`];
  toogleTab(defaultTab, tabs);

  buttons.forEach((button) => {
    const id = button.text;
    const tab = EZGUI.components[`entitiesTab${id}`];
    button.on('click', () => {
      toogleTab(tab, tabs);
    });
  });
}

function placeEntity(game, config) {
  const guid = Utils.getGUID();
  const extendedConfig = {
    guid,
    ...config,
  };
  game.eventEmitter.synced.entities.add(extendedConfig);
  Exporter.getInstance().addEntity(extendedConfig);
}

function addPlacementListener(game, EZGUI, phaserGame) {
  game.userPointer.on('leftbutton/down', (mousePointer) => {
    const coords = mousePointer.getRealCoords();
    const selector = Selector.getInstance();
    const z = EZGUI.components.spaceObjectsAttributeZ.value * 0.9 + 0.1;
    const scale = EZGUI.components.spaceObjectsAttributeScale.value + 1;

    if (coords.x - phaserGame.camera.x >= placementWindow.width) return;
    if (coords.y - phaserGame.camera.y >= placementWindow.height) return;
    if (!selector.isActive()) return;
    if (selector.getCategory() !== CATEGORY_ENTITIES) return;
    if (!selector.getSelectedPlayer()) {
      alert('Select a Player first in the Player Window!');
      return;
    }

    placeEntity(game, {
      id: selector.getId(),
      x: coords.x,
      y: coords.y,
      team: selector.getSelectedPlayer(),
    });
  });
}

function addRemoveListener(game) {
  game.userKeyboard.on('key/delete', () => {
    game.entityManager.entities(':selected').forEach((entity) => {
      Exporter.getInstance().removeEntityByGUID(entity.getGUID());
    });
  });
}

function addRightMouseButtonListener(game) {
  game.userPointer.on('rightbutton/down', () => {
    Selector.getInstance().reset();
  });
}

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();

  EZGUI.create(entitiesWindow, THEME);
  EZGUI.create(openEntitiesButton, THEME);

  const openButton = EZGUI.components.openEntitiesButton;
  const closeButton = EZGUI.components.closeEntitiesButton;
  const resetButton = EZGUI.components.resetEntitiesSelectionButton;

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
    placementWindow.width = gameWidth - openEntitiesButton.width;
  });

  EntitiesTabs.addEventListeners(game, EZGUI, phaserGame);
  addEventListenersToTabButtons(EZGUI);
  addPlacementListener(game, EZGUI, phaserGame);
  addRemoveListener(game);
  addRightMouseButtonListener(game);
}

export default {
  create,
};
