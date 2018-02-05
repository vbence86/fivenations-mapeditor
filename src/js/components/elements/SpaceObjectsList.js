import {
  CATEGORY_SPACE_OBJECTS,
  EVENT_ON_SELECTOR_RESET,
} from '../../helpers/consts';
import Selector from '../../helpers/Selector';
import EventEmitter from '../../helpers/EventEmitter';

const width = 400;
const buttonWidth = 75;
const buttonHeight = 75;

const spaceObjects = [
  'cloud1a',
  'cloud1b',
  'cloud1c',
  'cloud1d',
  'cloud2a',
  'cloud2b',
  'cloud2c',
  'cloud2d',
  'planet1',
  'planet2',
  'planet3',
  'planet4',
  'planet5',
  'planet6',
  'planet7',
  'planet8',
  'planet9',
  'planet10',
  'planet11',
  'planet12',
  'planet13',
  'planet14',
  'planet15',
  'planet16',
  'planet17',
  'planet18',
  'planet19',
  'planet20',
  'meteorites1',
  'meteorites2',
  'meteorites3',
  'meteorites4',
  'meteorites5',
  'meteorites6',
  'meteorites7',
  'meteorites8',
  'meteorites9',
  'smallplanet1',
  'smallplanet2',
  'smallplanet3',
  'smallplanet4',
  'galaxy1',
  'galaxy2',
  'galaxy3',
  'galaxy4',
  'galaxy5',
  'galaxy6',
  'galaxy7',
  'galaxy8',
  'galaxy9',
  'galaxy10',
  'galaxy11',
  'galaxy12',
];

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
    position: 'center',
    width: (buttonWidth + 12) * columnPerRow,
    height: (buttonHeight + 12) * rows,
    layout: [4, rows],
    children: objects.map(object => createButton(object)),
  };
}

function getGUIDefinition() {
  return {
    id: 'spaceObjectsList',
    component: 'List',
    padding: 3,
    position: 'top left',
    width: width - 15,
    height: 600,
    layout: [1, 1],
    children: [createButtonLayout(spaceObjects)],
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

  spaceObjects.forEach((id) => {
    const button = EZGUI.components[id];

    const dataObject = game.cache.getJSON(id);
    const { sprite, customFrame } = dataObject;

    const spriteObj = phaserGame.make.sprite(0, 0, sprite);
    spriteObj.frame = customFrame || 0;
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
        category: CATEGORY_SPACE_OBJECTS,
        id,
      });
    });
  });
}

function addEventListeners(game, EZGUI, phaserGame) {
  addButtonListeners(game, EZGUI, phaserGame);
}

export default {
  addEventListeners,
  getGUIDefinition,
};
