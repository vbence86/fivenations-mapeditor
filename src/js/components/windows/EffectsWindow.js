/* global window, alert */
import {
  THEME,
  CATEGORY_EFFECTS,
  EFFECT_TAB_MISC,
  EVENT_SPACE_OBJECT_SELECTED,
  EVENT_SPACE_OBJECT_SELECTION_CANCELED,
  EVENT_EFFECT_SELECTED,
  EVENT_EFFECT_SELECTION_CANCELED,
} from '../../helpers/consts';
import Utils from '../../helpers/Utils';
import Exporter from '../../helpers/Exporter';
import Selector from '../../helpers/Selector';
import EventEmitter from '../../helpers/EventEmitter';
import EffectsTabs from '../elements/EffectsTabs';

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

const tabButtonIds = [EFFECT_TAB_MISC];

const defaultTabId = EFFECT_TAB_MISC;
const activeTab = defaultTabId;

const tabButtonConfig = {
  width: 50,
  height: 40,
};

let selectedEffect;
let selectionSprite;
let expanded = false;
let animating = false;

const openEffectsButton = {
  id: 'openEffectsButton',
  text: 'Effects',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: -120 + gameWidth,
    y: 205,
  },
  width: 120,
  height: 40,
};

const closeEffectsButton = {
  id: 'closeEffectsButton',
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

const resetEffectsSelectionButton = {
  id: 'resetEffectsSelectionButton',
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
    id: `effectsWindowTabButton${id}`,
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

function createEffectTabLayout() {
  const buttonCount = tabButtonIds.length;
  return {
    id: 'effectsWindowTabLayout',
    component: 'Layout',
    padding: 3,
    position: 'top left',
    width: (tabButtonConfig.width + 6) * buttonCount,
    height: tabButtonConfig.height + 6,
    layout: [buttonCount, 1],
    children: tabButtonIds.map(id => createTabButton(id)),
  };
}

const effectsWindow = {
  id: 'effectsWindow',
  component: 'Window',
  header: {
    id: 'ttl',
    skin: 'blueheader',
    position: {
      x: 0,
      y: 0,
    },
    height: 40,
    text: 'Effects',
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
      id: 'effectsHeaderButtonsLayout',
      component: 'Layout',
      position: 'top left',
      padding: 3,
      width: width - 15,
      height: 60,
      layout: [10, 1],
      children: [closeEffectsButton, resetEffectsSelectionButton],
    },
    createEffectTabLayout(),
    EffectsTabs.getGUIDefinition(EFFECT_TAB_MISC),
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
  const tween = phaserGame.add.tween(EZGUI.components.effectsWindow).to(
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
  const tabs = tabButtonIds.map(id => EZGUI.components[`effectsTab${id}`]);
  const buttons = tabButtonIds.map(id => EZGUI.components[`effectsWindowTabButton${id}`]);

  const defaultTab = EZGUI.components[`effectsTab${defaultTabId}`];
  toogleTab(defaultTab, tabs);

  buttons.forEach((button) => {
    const id = button.text;
    const tab = EZGUI.components[`effectsTab${id}`];
    button.on('click', () => {
      toogleTab(tab, tabs);
    });
  });
}

function placeEffect(game, config) {
  const guid = Utils.getGUID();
  const { id } = config;
  const DO = game.cache.getJSON(id);
  const extendedConfig = {
    guid,
    ...config,
  };

  if (id.indexOf('-wreckage') !== -1) {
    let customFrame;
    if (DO.frames && DO.frames.length > 1) {
      customFrame = DO.frames[Utils.rnd(0, DO.frames.length)];
    } else {
      customFrame = DO.customFrame;
    }
    extendedConfig.ttlDisabled = true;
    extendedConfig.idleDisabled = true;
    extendedConfig.customFrame = customFrame;
  }

  game.eventEmitter.synced.effects.add(extendedConfig);
  Exporter.getInstance().addEffect(extendedConfig);
}

function addPlacementListener(game, EZGUI, phaserGame) {
  game.userPointer.on('leftbutton/down', (mousePointer) => {
    const coords = mousePointer.getRealCoords();
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
    if (selector.getCategory() !== CATEGORY_EFFECTS) return;

    placeEffect(game, {
      id: selector.getId(),
      x: coords.x,
      y: coords.y,
    });
  });
}

function isMouseOverEffect(pointer, effect) {
  if (!effect) return;
  const DO = effect.getDataObject();
  const width = DO.getWidth();
  const height = DO.getHeight();
  const x = effect.sprite.x - width / 2;
  const y = effect.sprite.y - height / 2;
  return (
    pointer.x >= x &&
    pointer.x <= x + width &&
    pointer.y >= y &&
    pointer.y <= y + height
  );
}

function addSelectEffectListener(game, phaserGame) {
  const entityManager = ns.game.entityManager;
  const effectManager = ns.game.effectManager;
  const exporter = Exporter.getInstance();
  const local = EventEmitter.getInstance();

  game.userPointer.on('leftbutton/down', (mousePointer) => {
    const selector = Selector.getInstance();
    if (selector.isActive()) return;
    if (entityManager.getSelectedEntities().length > 0) return;

    // selection functionality must be disabled if there is an
    // overlay window above the game stage
    if (ns.noInputOverlay) return;

    const pointer = mousePointer.getRealCoords();
    const effects = exporter.getEffects();

    for (let i = effects.length - 1; i >= 0; i -= 1) {
      const effect = effectManager.getEffectByGUID(effects[i].guid);
      if (isMouseOverEffect(pointer, effect)) {
        local.emit(EVENT_EFFECT_SELECTED, effect);
        local.emit(EVENT_SPACE_OBJECT_SELECTION_CANCELED);
        return;
      }
    }

    local.emit(EVENT_EFFECT_SELECTION_CANCELED);
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
  eventEmitter.on(EVENT_EFFECT_SELECTED, (effect) => {
    const sprite = effect.sprite;
    const scaleX = sprite.width / 100;
    const scaleY = sprite.height / 100;

    selectionSprite.visible = true;
    selectionSprite.scale.setTo(scaleX, scaleY);
    effect.sprite.addChild(selectionSprite);
    selectedEffect = effect;
  });

  eventEmitter.on(EVENT_EFFECT_SELECTION_CANCELED, () => {
    selectedEffect = null;
    selectionSprite.visible = false;
  });
}

function addRemoveEffectListener(game, phaserGame) {
  const eventEmitter = ns.game.eventEmitter;
  game.userKeyboard.on('key/delete', () => {
    if (!selectedEffect) return;
    selectedEffect.sprite.removeChild(selectionSprite);
    eventEmitter.synced.effects(selectedEffect).remove();
    Exporter.getInstance().removeEffectByGUID(selectedEffect.getGUID());
    selectedEffect = null;
  });
}

function addRightMouseButtonListener(game) {
  game.userPointer.on('rightbutton/down', () => {
    Selector.getInstance().reset();
  });
}

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();

  EZGUI.create(effectsWindow, THEME);
  EZGUI.create(openEffectsButton, THEME);

  const openButton = EZGUI.components.openEffectsButton;
  const closeButton = EZGUI.components.closeEffectsButton;
  const resetButton = EZGUI.components.resetEffectsSelectionButton;

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
    const BPD = ns.game.GUI.getBuildingPlacementDisplay();
    BPD.deactivate();
    Selector.getInstance().reset();
  });

  eventEmitter.on('windowOpened', () => {
    placementWindow.width = gameWidth - width;
  });

  eventEmitter.on('windowClosed', () => {
    placementWindow.width = gameWidth - openEffectsButton.width;
  });

  EffectsTabs.addEventListeners(game, EZGUI, phaserGame);
  addEventListenersToTabButtons(EZGUI);
  addPlacementListener(game, EZGUI, phaserGame);
  addRemoveEffectListener(game);
  addRightMouseButtonListener(game);

  // selection sprite that is added to the selected space objects
  createSelectionSprite(game);

  // adds listeners to mouse click to select space objects
  addSelectEffectListener(game, phaserGame);
  addSelectionListeners(game);
}

export default {
  create,
};
