/* global window */
import { THEME } from '../helpers/consts';

const ns = window.fivenations;
const gameWidth = ns.window.width;
const gameHeight = ns.window.height;
const width = 400;
const height = gameHeight;
const offsetExpadend = gameWidth - width;
const offsetClosed = gameWidth;

let expanded = false;
let animating = false;

const openMapConfigButton = {
  id: 'openMapConfigButton',
  text: 'Map',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: -80 + gameWidth,
    y: 0,
  },
  width: 80,
  height: 40,
};

const closeMapConfigButton = {
  id: 'closeMapConfigButton',
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

const mapSizesSelector = {
  component: 'Layout',
  position: { x: 0, y: 0 },
  width: 250,
  height: 300,
  padding: 2,
  layout: [1, 6],
  children: [
    {
      id: 'label1',
      text: 'Map size',
      font: {
        size: '18px',
        family: 'Arial',
      },
      component: 'Label',
      position: 'top left',
      width,
      height: 80,
    },
    {
      id: 'mapSizeType1',
      text: ' 64x 64',
      component: 'Radio',
      group: 1,
      position: 'top left',
      width: 30,
      height: 30,
    },
    {
      id: 'mapSizeType2',
      text: ' 96x 96',
      component: 'Radio',
      group: 1,
      position: 'top left',
      width: 30,
      height: 30,
    },
    {
      id: 'mapSizeType3',
      text: ' 128 x 128',
      component: 'Radio',
      group: 1,
      position: 'top left',
      width: 30,
      height: 30,
    },
    {
      id: 'mapSizeType4',
      text: ' 192 x 192',
      component: 'Radio',
      group: 1,
      position: 'top left',
      width: 30,
      height: 30,
    },
    {
      id: 'mapSizeType5',
      text: ' 256 x 256',
      component: 'Radio',
      group: 1,
      position: 'top left',
      width: 30,
      height: 30,
    },
  ],
};

const mapConfigWindow = {
  id: 'mapConfigWindow',
  component: 'Window',
  header: {
    id: 'ttl',
    skin: 'blueheader',
    position: {
      x: 0,
      y: 0,
    },
    height: 40,
    text: 'Map Settings',
  },
  draggable: true,
  padding: 4,
  position: {
    x: gameWidth,
    y: 0,
  },
  width,
  height,
  layout: [1, 2],
  children: [closeMapConfigButton, mapSizesSelector],
};

function toogleWindow(EZGUI, phaserGame) {
  if (animating) return;
  const targetCoord = expanded ? offsetClosed : offsetExpadend;
  const tween = phaserGame.add.tween(EZGUI.components.mapConfigWindow).to(
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
  EZGUI.create(mapConfigWindow, THEME);
  EZGUI.create(openMapConfigButton, THEME);

  EZGUI.components.openMapConfigButton.on('click', () => {
    EZGUI.components.openMapConfigButton.visible = false;
    toogleWindow(EZGUI, phaserGame);
  });

  EZGUI.components.closeMapConfigButton.on('click', () => {
    EZGUI.components.openMapConfigButton.visible = true;
    toogleWindow(EZGUI, phaserGame);
  });
}

export default {
  create,
};
