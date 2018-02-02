/* global window, alert */
import { THEME } from '../../helpers/consts';
import Exporter from '../../helpers/Exporter';
import EventEmitter from '../../helpers/EventEmitter';

const ns = window.fivenations;
const gameWidth = ns.window.width;
const gameHeight = ns.window.height;
const width = 400;
const height = gameHeight;
const offsetExpadend = gameWidth - width;
const offsetClosed = gameWidth;
const hLayoutBlock = 64;

let expanded = false;
let animating = false;

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
    y: 123,
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
    closeEntitiesButton,
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

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();

  EZGUI.create(entitiesWindow, THEME);
  EZGUI.create(openEntitiesButton, THEME);

  eventEmitter.on('windowOpened', () => {
    EZGUI.components.openEntitiesButton.visible = false;
  });

  eventEmitter.on('windowClosed', () => {
    EZGUI.components.openEntitiesButton.visible = true;
  });

  EZGUI.components.openEntitiesButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowOpened');
  });

  EZGUI.components.closeEntitiesButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowClosed');
  });
}

export default {
  create,
};
