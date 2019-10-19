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
  'bg_asteroidfields_normal1',
  'bg_asteroidfields_normal2',
  'bg_asteroidfields_normal3',
  'bg_asteroidfields_normal4',
  'bg_asteroidfields_normal5',
  'bg_asteroidfields_normal6',
  'bg_asteroidfields_normal7',
  'bg_asteroidfields_normal8',
  'bg_asteroidfields_normal9',
  'bg_asteroidfields_normal10',
  'bg_asteroidfields_vulcanic1',
  'bg_asteroidfields_vulcanic2',
  'bg_asteroidfields_vulcanic3',
  'bg_asteroidfields_vulcanic4',
  'bg_asteroidfields_vulcanic5',
  'bg_asteroidfields_vulcanic6',
  'bg_asteroidfields_vulcanic7',
  'bg_asteroidfields_vulcanic8',
  'bg_asteroidfields_vulcanic9',
  'bg_asteroidfields_vulcanic10',
  'bg_bigfog_blue1',
  'bg_bigfog_blue2',
  'bg_bigfog_blue3',
  'bg_bigfog_blue4',
  'bg_bigfog_blue5',
  'bg_bigfog_green1',
  'bg_bigfog_green2',
  'bg_bigfog_green3',
  'bg_bigfog_izlar1',
  'bg_bigfog_izlar2',
  'bg_bigfog_izlar3',
  'bg_bigfog_izlar4',
  'bg_bigfog_izlar5',
  'bg_bigfog_magenta1',
  'bg_bigfog_purple1',
  'bg_bigfog_purple2',
  'bg_bigfog_purple3',
  'bg_bigfog_red1',
  'bg_bigfog_red2',
  'bg_bigfog_red3',
  'bg_bigfog_red4',
  'bg_dustfields_blue1',
  'bg_dustfields_blue2',
  'bg_dustfields_blue3',
  'bg_dustfields_blue4',
  'bg_dustfields_blue5',
  'bg_dustfields_green1',
  'bg_dustfields_green2',
  'bg_dustfields_green3',
  'bg_dustfields_green4',
  'bg_dustfields_green5',
  'bg_dustfields_magenta1',
  'bg_dustfields_magenta2',
  'bg_dustfields_magenta3',
  'bg_dustfields_magenta4',
  'bg_dustfields_magenta5',
  'bg_dustfields_purple1',
  'bg_dustfields_purple2',
  'bg_dustfields_purple3',
  'bg_dustfields_purple4',
  'bg_dustfields_purple5',
  'bg_dustfields_izlargreen1',
  'bg_dustfields_izlargreen2',
  'bg_dustfields_izlargreen3',
  'bg_dustfields_izlargreen4',
  'bg_dustfields_izlargreen5',
  'bg_dustfields_frozen1',
  'bg_dustfields_frozen2',
  'bg_dustfields_frozen3',
  'bg_dustfields_frozen4',
  'bg_dustfields_frozen5',
  'bg_clouds1',
  'bg_clouds2',
  'bg_clouds3',
  'bg_clouds4',
  'bg_clouds5',
  'bg_clouds6',
  'bg_clouds7',
  'bg_clouds8',
  'bg_clouds9',
  'bg_clouds10',
  'bg_izlarclouds1',
  'bg_izlarclouds2',
  'bg_izlarclouds3',
  'bg_izlarclouds4',
  'bg_izlarclouds5',
  'bg_izlarclouds6',
  'bg_izlarclouds7',
  'bg_izlarclouds8',
  'bg_izlarclouds9',
  'bg_izlarclouds10',
  'bg_dustfields_red1',
  'bg_dustfields_red2',
  'bg_dustfields_red3',
  'bg_dustfields_red4',
  'bg_dustfields_red5',
  'bg_federation_gadgets1',
  'bg_federation_gadgets2',
  'bg_federation_gadgets3',
  'bg_federation_gadgets4',
  'bg_federation_gadgets5',
  'bg_federation_gadgets6',
  'bg_federation_gadgets7',
  'bg_federation_gadgets8',
  'bg_federation_gadgets9',
  'bg_federation_gadgets10',
  'bg_federation_gadgets11',
  'bg_federation_gadgets12',
  'bg_federation_gadgets13',
  'bg_federation_gadgets14',
  'bg_federation_gadgets15',
  'bg_federation_gadgets16',
  'bg_federation_gadgets17',
  'bg_federation_gadgets18',
  'bg_athrael_monuments1',
  'bg_athrael_monuments2',
  'bg_athrael_monuments3',
  'bg_athrael_monuments4',
  'bg_athrael_monuments5',
  'bg_athrael_monuments6',
  'bg_athrael_monuments7',
  'bg_athrael_monuments8',
  'bg_athrael_monuments9',
  'bg_athrael_monuments10',
  'bg_athrael_monuments11',
  'bg_athrael_monuments12',
  'bg_athrael_monuments13',
  'bg_athrael_monuments14',
  'bg_athrael_monuments15',
  'bg_athrael_monuments16',
  'bg_athrael_monuments17',
  'bg_athrael_monuments18',
  'bg_athrael_monuments19',
  'bg_giantstars1',
  'bg_giantstars2',
  'bg_giantstars3',
  'bg_giantstars4',
  'bg_izlar_extremophytes1',
  'bg_izlar_extremophytes2',
  'bg_izlar_extremophytes3',
  'bg_izlar_extremophytes4',
  'bg_izlar_extremophytes5',
  'bg_izlar_extremophytes6',
  'bg_izlar_extremophytes7',
  'bg_izlar_jellytree1',
  'bg_izlar_jellytree2',
  'bg_izlar_jellytree3',
  'bg_izlar_skeletons1',
  'bg_izlar_skeletons2',
  'bg_izlar_skeletons3',
  'bg_izlar_skeletons4',
  'bg_lonsdaleitefields_normal1',
  'bg_lonsdaleitefields_normal2',
  'bg_lonsdaleitefields_normal3',
  'bg_lonsdaleitefields_normal4',
  'bg_lonsdaleitefields_normal5',
  'bg_lonsdaleitefields_normal6',
  'bg_magmafields1',
  'bg_magmafields2',
  'bg_magmafields3',
  'bg_magmafields4',
  'bg_magmafields5',
  'bg_planets1',
  'bg_planets2',
  'bg_planets3',
  'bg_planets4',
  'bg_planets5',
  'bg_planets6',
  'bg_planets7',
  'bg_planets8',
  'bg_planets9',
  'bg_planets10',
  'bg_planets11',
  'bg_planets12',
  'bg_planets13',
  'bg_planets14',
  'bg_planets15',
  'bg_planets16',
  'bg_planets17',
  'bg_planets18',
  'bg_planets19',
  'bg_planets20',
  'bg_planets21',
  'bg_planets22',
  'bg_smallplanets1',
  'bg_smallplanets2',
  'bg_smallplanets3',
  'bg_smallplanets4',
  'bg_smallplanets5',
  'bg_sylon_monuments1',
  'bg_sylon_monuments2',
  'bg_sylon_monuments3',
  'bg_sylon_monuments4',
  'bg_sylon_monuments5',
  'bg_sylon_monuments6',
  'bg_sylon_monuments7',
  'bg_sylon_monuments8',
  'bg_sylon_monuments9',
  'bg_sylon_monuments10',
  'bg_sylon_monuments11',
  'bg_sylon_monuments12',
  'bg_sylon_monuments13',
  'bg_sylon_monuments14',
  'bg_sylon_monuments15',
  'bg_sylon_monuments16',
  'bg_sylon_monuments17',
  'bg_sylon_monuments18',
  'bg_sylon_monuments19',
  'bg_sylon_monuments20',
  'bg_wreckfields1',
  'bg_wreckfields2',
  'bg_wreckfields3',
  'bg_wreckfields4',
  'bg_wreckfields5',
  'bg_wreckfields6',
  'bg_wreckfields7',
  'bg_wreckfields8',
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
