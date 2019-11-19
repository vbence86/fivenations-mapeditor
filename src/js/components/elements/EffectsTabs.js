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
    'nebulafog1',
    'nebulafog2',
    'nebulafog3',
    'nebulafog4',
    'nebulafog5',
    'stellar_cloud-1',
    'stellar_cloud-2',
    'stellar_cloud-3',
    'stellar_cloud-4',
    'stellar_cloud-5',
    'stellar_cloud-6',
    'stellar_cloud-7',
    'stellar_cloud-8',
    'stellar_cloud-9',
    'stellar_cloud-10',
    'stellar_cloud-11',
    'stellar_cloud-12',
    'stellar_cloud-13',
    'izlar_cloud-1',
    'izlar_cloud-2',
    'izlar_cloud-3',
    'izlar_cloud-4',
    'izlar_cloud-5',
    'izlar_cloud-6',
    'izlar_cloud-7',
    'izlar_cloud-8',
    'izlar_cloud-9',
    'izlar_cloud-10',
    'izlar_cloud-11',
    'izlar_cloud-12',
    'izlar_cloud-13',
    'obj_nervespores-1',
    'obj_nervespores-2',
    'obj_nervespores-3',
    'obj_nervespores-4',
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
    'destructivefield',
    'blackhole',
    'magneticradiation',
    'sporecloud',
    'wormhole',
    'decor_laserwall',
    'absorber-wreckage',
    'advancedmanufacture-wreckage',
    'aegis-wreckage',
    'agaric-wreckage',
    'alpha-wreckage',
    'anvil-wreckage',
    'array-wreckage',
    'arson-wreckage',
    'assimilator-wreckage',
    'astrometricstation-wreckage',
    'avenger-wreckage',
    'avenger2-wreckage',
    'basilica-wreckage',
    'behemoth-wreckage',
    'bifrostbridge-wreckage',
    'biosphere-wreckage',
    'birthingpool-wreckage',
    'breaker-wreckage',
    'caldron-wreckage',
    'capitol-wreckage',
    'centralpyramid-wreckage',
    'chimneyplant-wreckage',
    'chrysodendron-wreckage',
    'civilianbase-wreckage',
    'clairvoyant-wreckage',
    'clathruscolony-wreckage',
    'commandcenter-wreckage',
    'conflux-wreckage',
    'conservatory-wreckage',
    'consulate-wreckage',
    'cormoran-wreckage',
    'corsair-wreckage',
    'cradlestone-wreckage',
    'craftmill-wreckage',
    'cryon-wreckage',
    'decaychamber-wreckage',
    'decay-wreckage',
    'deepspacelab-wreckage',
    'defenseplatform-wreckage',
    'defensiveserver-wreckage',
    'devastator-wreckage',
    'dockyard-wreckage',
    'dome-wreckage',
    'dresda-wreckage',
    'eclipse-wreckage',
    'eirainstitute-wreckage',
    'eiraresearchstation-wreckage',
    'energystorage-wreckage',
    'evulatory-wreckage',
    'flagship-wreckage',
    'flagshipyard-wreckage',
    'flanker-wreckage',
    'fleetheadquarters-wreckage',
    'fonia-wreckage',
    'forge-wreckage',
    'forum-wreckage',
    'fusionreactor-wreckage',
    'galileo-wreckage',
    'gathering-wreckage',
    'gloom-wreckage',
    'grinder-wreckage',
    'guardstation-wreckage',
    'guild-wreckage',
    'habitat-wreckage',
    'hailstorm-wreckage',
    'hall-wreckage',
    'harvester-wreckage',
    'hauler-wreckage',
    'havoc-wreckage',
    'helia-wreckage',
    'helium3-reactor-wreckage',
    'icarus-wreckage',
    'installationprime-wreckage',
    'installator-wreckage',
    'invader-wreckage',
    'ioncannon-wreckage',
    'jumpgate-wreckage',
    'keikosentrypod-wreckage',
    'khan-wreckage',
    'kutuzov-wreckage',
    'manufactureprime-wreckage',
    'manufacture-wreckage',
    'martyrium-wreckage',
    'mask-wreckage',
    'masstransmitter-wreckage',
    'materialsilo-wreckage',
    'medical-station-wreckage',
    'merchantport-wreckage',
    'metabolist-wreckage',
    'mindfungus-wreckage',
    'mind-wreckage',
    'miningstation-wreckage',
    'monumentofwill-wreckage',
    'mothership-wreckage',
    'nutrientcolony-wreckage',
    'offensiveserver-wreckage',
    'overseer-wreckage',
    'pasteur-wreckage',
    'piratebase-wreckage',
    'plasmaraid-wreckage',
    'pond-wreckage',
    'powercore-wreckage',
    'powerplant-wreckage',
    'provincialbeacon-wreckage',
    'psyhicdome-wreckage',
    'quantumcore-wreckage',
    'queen-wreckage',
    'rector-wreckage',
    'refinery-wreckage',
    'repairstation-wreckage',
    'researchcenter-wreckage',
    'ruptor-wreckage',
    'sanctuary-wreckage',
    'seed-wreckage',
    'senate-wreckage',
    'shade-wreckage',
    'shieldgenerator-wreckage',
    'shipfactory-wreckage',
    'skycourt-wreckage',
    'solarstation-wreckage',
    'stellarreactor-wreckage',
    'stgeorge-wreckage',
    'supportcenter-wreckage',
    'supportcomplex-wreckage',
    'swarmmembrane-wreckage',
    'swarmmother-wreckage',
    'syluscore-wreckage',
    'symbioticorgan-wreckage',
    'synodum-wreckage',
    'teller-wreckage',
    'theocratsseat-wreckage',
    'theocrat-wreckage',
    'transponder-wreckage',
    'trinity-wreckage',
    'vanguard-wreckage',
    'vindicator-wreckage',
    'warren-wreckage',
    'wormholegenerator-wreckage',
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

  mergeAllEntities().forEach(id =>
    setTimeout(() => {
      const button = EZGUI.components[id];
      if (!button) return;

      const atlasKey = (ns.effects[id] && ns.effects[id].atlasKey) || id;
      const spriteObj = phaserGame.make.sprite(0, 0, atlasKey);
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
    }));
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
