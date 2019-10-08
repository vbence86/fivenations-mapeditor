/* global window, alert */
import { THEME, PLAYERS_COUNT } from '../../helpers/consts';
import Utils from '../../helpers/Utils';
import Exporter from '../../helpers/Exporter';
import EventEmitter from '../../helpers/EventEmitter';
import Selector from '../../helpers/Selector';

const ns = window.fivenations;
const gameWidth = ns.window.width;
const gameHeight = ns.window.height;
const width = 400;
const height = gameHeight;
const offsetExpadend = gameWidth - width;
const offsetClosed = gameWidth;
const hLayoutBlock = 64;
const mapSizes = [
  {
    width: 64,
    height: 64,
  },
  {
    width: 96,
    height: 96,
  },
  {
    width: 128,
    height: 128,
  },
  {
    width: 196,
    height: 196,
  },
  {
    width: 256,
    height: 256,
  },
];

let expanded = false;
let animating = false;
let selectedGalaxyType;
let selectedMapSizeType;

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
    x: -120 + gameWidth,
    y: 41,
  },
  width: 120,
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
  height: hLayoutBlock * 4,
  padding: 2,
  layout: [1, 6],
  children: [
    {
      id: 'mapSizeLabel',
      text: 'Map size',
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

const galaxyListHeader = {
  id: 'galaxyListHeader',
  text: 'Galaxy type',
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

const galaxyList = {
  id: 'mapGalaxyList',
  component: 'List',
  padding: 3,
  position: 'center',
  width: width - 10,
  height: hLayoutBlock * 3,
  layout: [4, 2],
  children: [
    {
      id: 'mapGalaxyButton1',
      component: 'Button',
      position: 'center',
      width: 75,
      height: 75,
    },
    {
      id: 'mapGalaxyButton2',
      component: 'Button',
      position: 'center',
      width: 75,
      height: 75,
    },
    {
      id: 'mapGalaxyButton3',
      component: 'Button',
      position: 'center',
      width: 75,
      height: 75,
    },
    {
      id: 'mapGalaxyButton4',
      component: 'Button',
      position: 'center',
      width: 75,
      height: 75,
    },
    {
      id: 'mapGalaxyButton5',
      component: 'Button',
      position: 'center',
      width: 75,
      height: 75,
    },
    {
      id: 'mapGalaxyButton6',
      component: 'Button',
      position: 'center',
      width: 75,
      height: 75,
    },
  ],
};

const generateMapButton = {
  id: 'generateMapButton',
  text: 'Generate',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  skin: 'bluebutton',
  position: {
    x: width - 135,
    y: 0,
  },
  width: 120,
  height: 40,
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
  layout: [1, 12], // one layout block is 64px
  children: [
    closeMapConfigButton,
    mapSizesSelector,
    null,
    null,
    null,
    null,
    galaxyListHeader,
    null,
    galaxyList,
    null,
    null,
    generateMapButton,
  ],
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

function createMapConfig() {
  return {
    width: mapSizes[selectedMapSizeType - 1].width,
    height: mapSizes[selectedMapSizeType - 1].height,
    starfield: {
      backgroundTile: selectedGalaxyType,
    },
  };
}

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();

  EZGUI.create(mapConfigWindow, THEME);
  EZGUI.create(openMapConfigButton, THEME);

  eventEmitter.on('windowOpened', () => {
    EZGUI.components.openMapConfigButton.visible = false;
  });

  eventEmitter.on('windowClosed', () => {
    EZGUI.components.openMapConfigButton.visible = true;
  });

  EZGUI.components.openMapConfigButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowOpened');
  });

  EZGUI.components.closeMapConfigButton.on('click', () => {
    toogleWindow(EZGUI, phaserGame);
    eventEmitter.emit('windowClosed');
  });

  const mapSizeButtons = [
    EZGUI.components.mapSizeType1,
    EZGUI.components.mapSizeType2,
    EZGUI.components.mapSizeType3,
    EZGUI.components.mapSizeType4,
    EZGUI.components.mapSizeType5,
  ];

  mapSizeButtons.forEach((button, idx) => {
    button.on('click', () => {
      selectedMapSizeType = idx + 1;
    });
  });

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

  EZGUI.components.generateMapButton.on('click', () => {
    if (!selectedMapSizeType || !selectedGalaxyType) {
      alert('Select Size and Galaxy of the map!');
      return;
    }

    Utils.resetCurrentMap(game);

    const exporter = Exporter.getInstance();
    const config = createMapConfig();

    exporter.setMap(config);

    game.map.new(config);

    // reveal fog of war for all players
    for (let i = 0, l = PLAYERS_COUNT; i < l; i += 1) {
      game.map.getFogOfWar().blackSheepWall(i + 1);
    }

    // Removes Fog of War from the game stage
    game.map.getFogOfWarRenderer().hide();

    game.map.getFogOfWar().setActiveVisibleTeam(1);

    Selector.getInstance().reset();
  });
}

export default {
  create,
};
