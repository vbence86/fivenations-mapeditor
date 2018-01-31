/* global window */
const ns = window.fivenations;
const gameWidth = ns.window.width;
const gameHeight = ns.window.height;
const width = 400;
const height = 768;
const offsetExpadend = gameWidth - width;
const offsetClosed = gameWidth - 60;

let expanded = false;
let animating = false;

const expandButton = {
  id: 'expandButton',
  text: '',
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

const mainWindow = {
  id: 'mainWindow',
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
    x: gameWidth - 60,
    y: 0,
  },
  width,
  height,
  layout: [1, 2],
  children: [expandButton],
};

function registerEventListeners(game, EZGUI, phaserGame) {
  EZGUI.components.expandButton.on('click', () => {
    if (animating) return;
    const mainWindow = EZGUI.components.mainWindow;
    const targetCoord = expanded ? offsetClosed : offsetExpadend;
    const tween = phaserGame.add.tween(mainWindow).to(
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
  });
}

export { registerEventListeners };
export default mainWindow;
