/* global window, alert */
import { THEME, CATEGORY_PLAYER_START_LOCATION } from '../../helpers/consts';
import Exporter from '../../helpers/Exporter';
import PlayersList from '../elements/PlayersList';
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

const openPlayersButton = {
  id: 'openPlayersButton',
  text: 'Players',
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

const closePlayersButton = {
  id: 'closePlayersButton',
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

const playersListHeader = {
  id: 'playersListHeader',
  text: 'Players list',
  font: {
    size: '20px',
    family: 'Arial',
  },
  component: 'Label',
  position: {
    x: 0,
    y: 0,
  },
  width,
  height: 30,
};

const playersWindow = {
  id: 'playersWindow',
  component: 'Window',
  header: {
    id: 'ttl',
    skin: 'blueheader',
    position: {
      x: 0,
      y: 0,
    },
    height: 40,
    text: 'Players Settings',
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
    closePlayersButton,
    playersListHeader,
    PlayersList.getGUIDefinition(),
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
  const tween = phaserGame.add.tween(EZGUI.components.playersWindow).to(
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

function addStartLocationPlacementListener(game, EZGUI, phaserGame) {
  game.userPointer.on('leftbutton/down', (mousePointer) => {
    const coords = mousePointer.getRealCoords();
    const selector = Selector.getInstance();

    if (ns.noInputOverlay) return;

    if (coords.x - phaserGame.camera.x >= placementWindow.width) return;
    if (coords.y - phaserGame.camera.y >= placementWindow.height) return;
    // minimap
    if (coords.x <= 182 && coords.y > placementWindow.height - 178) return;
    if (!selector.isActive()) return;
    if (selector.getCategory() !== CATEGORY_PLAYER_START_LOCATION) return;

    placeStartLocation({
      id: selector.getId(),
      x: coords.x,
      y: coords.y,
    });
  });
}

function placeStartLocation(config) {
  const manager = StartLocationManager.getInstance();
  const { id, x, y } = config;
  const coords = { x, y };
  manager.place(id, coords);

  Exporter.getInstance().setPlayer({
    idx: id,
    startLocation: coords,
  });

  Selector.getInstance().reset();
}

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();

  EZGUI.create(playersWindow, THEME);
  EZGUI.create(openPlayersButton, THEME);

  eventEmitter.on('windowOpened', () => {
    EZGUI.components.openPlayersButton.visible = false;
  });

  eventEmitter.on('windowClosed', () => {
    EZGUI.components.openPlayersButton.visible = true;
  });

  EZGUI.components.openPlayersButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowOpened');
  });

  EZGUI.components.closePlayersButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowClosed');
  });

  PlayersList.addEventListeners(game, EZGUI, phaserGame);
}

export default {
  create,
};
