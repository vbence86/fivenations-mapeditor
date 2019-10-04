/* global window */
import {
  ENTITIES,
  CATEGORY_ENTITIES,
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_ATHRAEL,
  ENTITY_TAB_SYLON,
  ENTITY_TAB_THORUN,
  ENTITY_TAB_ZHOGARN,
  ENTITY_TAB_MISC,
  EVENT_ON_SELECTOR_RESET,
} from '../../helpers/consts';
import Selector from '../../helpers/Selector';
import EventEmitter from '../../helpers/EventEmitter';

const ns = window.fivenations;

const width = 400;
const buttonWidth = 80;
const buttonHeight = 80;

const excludedFromBPD = [
  'obj_sylonwalls1',
  'obj_sylonwalls2',
  'obj_sylonwalls3',
];
/**
 * Returns the id of the frame that should be displayed when the
 * BuildingPlacementDisplay is activated
 * @param {object} data - DataObject of the entity against which
 * the BuildingPlacementDisplay has been activated
 * @return {number} the frame of the entity that should be displayed
 */
function getDisplayFrame(data) {
  if (data.customFrame) return data.customFrame;
  if (data.animations && data.animations['idle-forever']) {
    if (data.animations['idle-forever'].frames.length === 1) {
      return data.animations['idle-forever'].frames[0];
    }
  }
  return 4;
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
  const rows = Math.ceil(objects.length / columnPerRow);
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
    id: `entitiesTab${category}`,
    component: 'List',
    padding: 3,
    position: {
      x: 0,
      y: 0,
    },
    width: width - 15,
    height: 520,
    layout: [1, 1],
    children: [createButtonLayout(ENTITIES[category])],
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

      const spriteObj = phaserGame.make.sprite(0, 0, id);
      const DO = phaserGame.cache.getJSON(id);
      spriteObj.frame = DO.customFrame || 1;

      if (ENTITIES[ENTITY_TAB_MISC].indexOf(id) !== -1) {
        spriteObj.frame = getDisplayFrame(DO);
      }

      const clone = phaserGame.make.sprite(0, 0, spriteObj.generateTexture());
      const scale = button.width / clone.width;

      clone.scale.setTo(scale, scale);
      clone.inputEnabled = true;

      button.addChild(clone);
      button.on('click', () => {
        const selector = Selector.getInstance();
        // attaches selector sprite to the button
        selection.visible = true;
        button.addChild(selection);
        // activates the BuildingPlacementDisplay
        const BPD = ns.game.GUI.getBuildingPlacementDisplay();
        BPD.deactivate();
        ns.BPDActivated = false;

        if (DO.building && excludedFromBPD.indexOf(id) === -1) {
          const playerManager = fivenations.game.playerManager;
          const player = playerManager
            .getPlayers()
            .find(player => player.getTeam() === selector.getSelectedPlayer());
          if (player) {
            BPD.activate(id, player);
            BPD.canBeBuiltAnywhere = true;
            ns.BPDActivated = true;
          }
        }

        // updates the current selection
        selector.select({
          category: CATEGORY_ENTITIES,
          id,
        });
      });
    }));
}

function mergeAllEntities() {
  return Object.keys(ENTITIES)
    .map(key => ENTITIES[key])
    .reduce((accumulator, list) => accumulator.concat(list), []);
}

function addEventListeners(game, EZGUI, phaserGame) {
  addButtonListeners(game, EZGUI, phaserGame);
}

export default {
  addEventListeners,
  getGUIDefinition,
};
