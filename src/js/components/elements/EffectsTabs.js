/* global window */
import {
  CATEGORY_EFFECTS,
  EFFECT_TAB_MISC,
  EVENT_ON_SELECTOR_RESET,
} from '../../helpers/consts';
import Selector from '../../helpers/Selector';
import EventEmitter from '../../helpers/EventEmitter';

const ns = window.fivenations;

const width = 400;
const buttonWidth = 80;
const buttonHeight = 80;

const effects = {
  [EFFECT_TAB_MISC]: [
    'destructivefield',
    'blackhole',
    'nebulafog1',
    'nebulafog2',
    'nebulafog3',
    'nebulafog4',
    'nebulafog5',
    'sporecloud',
    'obj_blazing_gas_type01',
    'obj_blazing_gas_type02',
    'obj_blazing_gas_type03',
    'obj_blazing_gas_type04',
    'obj_blazing_gas_type05',
    'obj_plasma_gas_type01',
    'obj_plasma_gas_type02',
    'obj_plasma_gas_type03',
    'obj_plasma_gas_type04',
    'obj_plasma_gas_type05',
    'obj_plasma_gas_type06',
    'decor_laserwall',
    'hailstorm-wreckage',
    'avenger-wreckage',
    'avenger2-wreckage',
    'stgeorge-wreckage',
    'teller-wreckage',
    'icarus-wreckage',
    'kutuzov-wreckage',
    'pasteur-wreckage',
    'dresda-wreckage',
    'astrometricstation-wreckage',
    'civilianbase-wreckage',
    'commandcenter-wreckage',
    'dockyard-wreckage',
    'fleetheadquarters-wreckage',
    'merchantport-wreckage',
    'miningstation-wreckage',
    'defenseplatform-wreckage',
    'researchcenter-wreckage',
    'shipfactory-wreckage',
    'solarstation-wreckage',
    'basilica-wreckage',
    'biosphere-wreckage',
    'centralpyramid-wreckage',
    'clairvoyant-wreckage',
    'conservatory-wreckage',
    'masstransmitter-wreckage',
    'monumentofwill-wreckage',
    'powercore-wreckage',
    'sanctuary-wreckage',
    'shieldgenerator-wreckage',
    'synodum-wreckage',
    'theocratsseat-wreckage',
    'energystorage-wreckage',
    'breaker-wreckage',
    'capitol-wreckage',
    'devastator-wreckage',
    'flagship-wreckage',
    'flagshipyard-wreckage',
    'flanker-wreckage',
    'forum-wreckage',
    'fusionreactor-wreckage',
    'gathering-wreckage',
    'grinder-wreckage',
    'guardstation-wreckage',
    'habitat-wreckage',
    'hall-wreckage',
    'harvester-wreckage',
    'havoc-wreckage',
    'invader-wreckage',
    'ioncannon-wreckage',
    'materialsilo-wreckage',
    'mothership-wreckage',
    'powerplant-wreckage',
    'provincialbeacon-wreckage',
    'senate-wreckage',
    'skycourt-wreckage',
    'theocrat-wreckage',
    'vanguard-wreckage',
    'vindicator-wreckage',
  ],
};

/**
 * Returns the id of the frame that should be displayed when the
 * BuildingPlacementDisplay is activated
 * @param {object} data - DataObject of the entity against which
 * the BuildingPlacementDisplay has been activated
 * @return {number} the frame of the entity that should be displayed
 */
function getDisplayFrame(data) {
  if (data.frames && data.frames.length) return data.frames[0];
  if (data.customFrame) return data.customFrame;
  if (data.animations && data.animations.idle) {
    const median = Math.floor(data.animations.idle.frames.length / 2);
    return median;
  }
  return 0;
}

function createButton(id) {
  return {
    component: 'Button',
    position: 'center',
    width: buttonWidth,
    height: buttonHeight,
    id,
  };
}

function createButtonLayout(objects) {
  const columnPerRow = 4;
  const rows = Math.floor(objects.length / columnPerRow);
  return {
    component: 'Layout',
    padding: 3,
    draggable: true,
    dragX: false,
    position: 'top left',
    width: (buttonWidth + 12) * columnPerRow,
    height: (buttonHeight + 12) * rows,
    layout: [4, rows],
    children: objects.map(object => createButton(object)),
  };
}

function getGUIDefinition(category) {
  return {
    id: `effectsTab${category}`,
    component: 'List',
    padding: 3,
    position: {
      x: 0,
      y: 0,
    },
    width: width - 15,
    height: 520,
    layout: [1, 1],
    children: [createButtonLayout(effects[category])],
  };
}

function addButtonListeners(game, EZGUI, phaserGame) {
  // create a new bitmap data object
  const bmd = game.add.bitmapData(buttonWidth, buttonHeight);

  // draw to the canvas context like normal
  bmd.ctx.beginPath();
  bmd.ctx.lineWidth = 5;
  bmd.ctx.strokeStyle = 'red';
  bmd.ctx.rect(0, 0, buttonWidth, buttonHeight);
  bmd.ctx.stroke();

  // use the bitmap data as the texture for the sprite
  const selection = game.add.sprite(0, 0, bmd);
  selection.visible = false;

  EventEmitter.getInstance().on(EVENT_ON_SELECTOR_RESET, () => {
    selection.visible = false;
  });

  mergeAllEntities().forEach((id) => {
    const button = EZGUI.components[id];
    if (!button) return;

    const spriteObj = phaserGame.make.sprite(0, 0, id);
    const DO = phaserGame.cache.getJSON(id);
    spriteObj.frame = getDisplayFrame(DO);

    const clone = phaserGame.make.sprite(0, 0, spriteObj.generateTexture());
    const scale = button.width / clone.width;

    clone.scale.setTo(scale, scale);
    clone.inputEnabled = true;

    button.addChild(clone);
    button.on('click', () => {
      // attaches selector sprite to the button
      selection.visible = true;
      button.addChild(selection);
      // updates the current selection
      Selector.getInstance().select({
        category: CATEGORY_EFFECTS,
        id,
      });
    });
  });
}

function mergeAllEntities() {
  return Object.keys(effects)
    .map(key => effects[key])
    .reduce((accumulator, list) => accumulator.concat(list), []);
}

function addEventListeners(game, EZGUI, phaserGame) {
  addButtonListeners(game, EZGUI, phaserGame);
}

export default {
  addEventListeners,
  getGUIDefinition,
};
