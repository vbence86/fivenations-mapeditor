import {
  CATEGORY_ENTITIES,
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_MISC,
  EVENT_ON_SELECTOR_RESET,
} from '../../helpers/consts';
import Selector from '../../helpers/Selector';
import EventEmitter from '../../helpers/EventEmitter';

const width = 400;
const buttonWidth = 80;
const buttonHeight = 80;

const entities = {
  [ENTITY_TAB_FEDERATION]: [
    'hurricane',
    'orca',
    'hailstorm',
    'stgeorge',
    'avenger',
    'avenger2',
    'icarus',
    'engineershuttle',
    'kutuzov',
    'pasteur',
    'dresda',
    'crow',
    'teller',
    'commandcenter',
    'miningstation',
    'civilianbase',
    'solarstation',
    'shipfactory',
    'dockyard',
    'merchantport',
    'researchcenter',
    'astrometricstation',
    'fleetheadquarters',
    'defensesatellite',
    'defenseplatform',
    'fusionreactor',
  ],
  [ENTITY_TAB_MISC]: [
    'asteroid1',
    'asteroid2',
    'asteroid3',
    'asteroid4',
    'asteroidbig1',
    'asteroidbig2',
    'asteroidsmall1',
    'asteroidsmall2',
    'asteroidsmall3',
    'asteroidsmall4',
    'asteroidice1',
    'asteroidice2',
    'asteroidicesmall1',
    'asteroidicesmall2',
    'asteroidsilicon1',
    'asteroidsilicon2',
    'asteroidsiliconsmall1',
    'asteroidsiliconsmall2',
    'asteroidtitanium1',
    'asteroidtitanium2',
    'asteroidtitaniumsmall1',
    'asteroidtitaniumsmall2',
    'asteroiduranium1',
    'asteroiduranium2',
    'asteroiduraniumsmall1',
    'asteroiduraniumsmall2',
  ],
};

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
    children: [createButtonLayout(entities[category])],
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
    spriteObj.frame = 1;

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
        category: CATEGORY_ENTITIES,
        id,
      });
    });
  });
}

function mergeAllEntities() {
  return Object.keys(entities)
    .map(key => entities[key])
    .reduce((accumulator, list) => accumulator.concat(list), []);
}

function addEventListeners(game, EZGUI, phaserGame) {
  addButtonListeners(game, EZGUI, phaserGame);
}

export default {
  addEventListeners,
  getGUIDefinition,
};
