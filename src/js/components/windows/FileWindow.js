/* global window, alert */
import { THEME, PLAYERS_COUNT } from '../../helpers/consts';
import Utils from '../../helpers/Utils';
import Exporter from '../../helpers/Exporter';
import Importer from '../../helpers/Importer';
import EventEmitter from '../../helpers/EventEmitter';
import Selector from '../../helpers/Selector';
import PlayersList from '../elements/PlayersList';

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

const openFileWindowButton = {
  id: 'openFileWindowButton',
  text: 'File',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: -120 + gameWidth,
    y: 0,
  },
  width: 120,
  height: 40,
};

const closeFileWindowButton = {
  id: 'closeFileWindowButton',
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

const exportMapButton = {
  id: 'exportMapButton',
  text: 'Save Map',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: 0,
    y: 0,
  },
  width: 120,
  height: 40,
};

const importMapButton = {
  id: 'importMapButton',
  text: 'Load Map',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: 0,
    y: 0,
  },
  width: 120,
  height: 40,
};

const FileWindow = {
  id: 'FileWindow',
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
  layout: [1, 12], // one layout block is 64px
  children: [closeFileWindowButton, importMapButton, exportMapButton],
};

function toogleWindow(EZGUI, phaserGame) {
  if (animating) return;
  const targetCoord = expanded ? offsetClosed : offsetExpadend;
  const tween = phaserGame.add.tween(EZGUI.components.FileWindow).to(
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

function addImportButtonListener(game, EZGUI) {
  const emitter = EventEmitter.getInstance();
  EZGUI.components.importMapButton.on('click', () => {
    const importer = Importer.getInstance();

    Utils.resetCurrentMap(game);

    importer.import().then(() => {
      importer.loadMap(game);

      const players = importer.getPlayers();
      emitter.emit('onPlayersImported', players);

      // reveal fog of war for all players
      for (let i = 0, l = PLAYERS_COUNT; i < l; i += 1) {
        game.map.getFogOfWar().blackSheepWall(i + 1);
      }

      // Removes Fog of War from the game stage
      game.map.getFogOfWarRenderer().hide();

      game.map.getFogOfWar().setActiveVisibleTeam(1);

      game.map.forceRefresh();

      game.botManager.reset();

      importer.updateExporter(Exporter.getInstance());
    });
  });
}

function addExportButtonListener(EZGUI) {
  EZGUI.components.exportMapButton.on('click', () => {
    const filename = prompt('Please enter the filename!', 'untitled-map.json');
    if (filename === null) {
      return;
    }

    Exporter.getInstance().download(filename);
    Selector.getInstance().reset();
  });
}

function addWindowListeners(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();
  const openButton = EZGUI.components.openFileWindowButton;
  const closeButton = EZGUI.components.closeFileWindowButton;

  eventEmitter.on('windowOpened', () => {
    openButton.visible = false;
  });

  eventEmitter.on('windowClosed', () => {
    openButton.visible = true;
  });

  openButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowOpened');
  });

  closeButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowClosed');
  });
}

function create(game, EZGUI, phaserGame) {
  EZGUI.create(FileWindow, THEME);
  EZGUI.create(openFileWindowButton, THEME);

  addImportButtonListener(game, EZGUI);
  addExportButtonListener(EZGUI);
  addWindowListeners(game, EZGUI, phaserGame);
}

export default {
  create,
};
