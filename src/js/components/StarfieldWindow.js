/* global window */
import { THEME } from '../helpers/consts';
import EventEmitter from '../helpers/EventEmitter';
// import Exporter from '../helpers/Exporter';

const ns = window.fivenations;
const gameWidth = ns.window.width;
const gameHeight = ns.window.height;
const width = 400;
const height = gameHeight;
const offsetExpadend = gameWidth - width;
const offsetClosed = gameWidth;
// const hLayoutBlock = 64;

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
    closeStarfieldButton,
    null,
    null,
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

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();

  EZGUI.create(StarfieldWindow, THEME);
  EZGUI.create(openStarfieldButton, THEME);

  eventEmitter.on('windowOpened', () => {
    EZGUI.components.openStarfieldButton.visible = false;
  });

  eventEmitter.on('windowClosed', () => {
    EZGUI.components.openStarfieldButton.visible = true;
  });

  EZGUI.components.openStarfieldButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowOpened');
  });

  EZGUI.components.closeStarfieldButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowClosed');
  });

  /*
  const galaxyButtons = [
    EZGUI.components.mapGalaxyButton1,
    EZGUI.components.mapGalaxyButton2,
    EZGUI.components.mapGalaxyButton3,
    EZGUI.components.mapGalaxyButton4,
    EZGUI.components.mapGalaxyButton5,
    EZGUI.components.mapGalaxyButton6,
  ];

  // create a new bitmap data object
  const bmd = game.add.bitmapData(75, 75);

  // draw to the canvas context like normal
  bmd.ctx.beginPath();
  bmd.ctx.lineWidth = 5;
  bmd.ctx.strokeStyle = 'red';
  bmd.ctx.rect(0, 0, 75, 75);
  bmd.ctx.stroke();

  // use the bitmap data as the texture for the sprite
  const selection = game.add.sprite(0, 0, bmd);
  selection.visible = false;

  galaxyButtons.forEach((button, idx) => {
    const starfieldName = `starfield-${idx + 1}`;
    const skin = phaserGame.make.sprite(0, 0, starfieldName);
    const scale = button.width / 1024;
    skin.inputEnabled = true;
    skin.scale.setTo(scale, scale);
    skin.alpha = 0.75;
    button.addChild(skin);
    button.on('click', () => {
      selection.visible = true;
      button.addChild(selection);
      selectedGalaxyType = starfieldName;
    });
  });
  */
}

export default {
  create,
};
