/* global window, alert */
import { THEME, ENTITIES, ENTITY_TAB_MISC } from '../../helpers/consts';
import Exporter from '../../helpers/Exporter';
import Selector from '../../helpers/Selector';
import EventEmitter from '../../helpers/EventEmitter';

const ICON_SPRITE = 'gui';
const ICON_TITANIUM = 'gui_resource_01_titanium.png';
const ICON_SILICIUM = 'gui_resource_02_silicium.png';
const ICON_URANIUM = 'gui_resource_03_uranium.png';
const ICON_ENERGY = 'gui_resource_04_energy.png';

const ns = window.fivenations;
const gameWidth = ns.window.width;
const gameHeight = ns.window.height;
const width = 500;
const height = 600;
const technologies = {};

const closePlayerSettingsButton = {
  id: 'closePlayerSettingsButton',
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

const playerNatureHeader = {
  id: 'playerNatureHeader',
  text: 'Player Nature',
  font: {
    size: '20px',
    family: 'Arial',
  },
  component: 'Label',
  position: 'top left',
  width,
  height: 30,
};

const natureLayout = {
  component: 'Layout',
  padding: 3,
  position: 'top left',
  width,
  height: 40,
  layout: [10, 1],
  children: [
    {
      id: 'playerNatureLabel1',
      text: 'Neutral',
      font: {
        size: '18px',
        family: 'Arial',
      },
      component: 'Label',
      position: 'top left',
      width: 80,
      height: 30,
    },
    null,
    null,
    {
      id: 'playerNautralCheckbox',
      component: 'Checkbox',
      position: 'top left',
      width: 30,
      height: 30,
    },
    null,
    null,
    {
      id: 'playerNatureLabel2',
      text: 'Capturable',
      font: {
        size: '18px',
        family: 'Arial',
      },
      component: 'Label',
      position: 'top left',
      width: 80,
      height: 30,
    },
    null,
    null,
    {
      id: 'playerCaptureCheckbox',
      component: 'Checkbox',
      position: 'top left',
      width: 30,
      height: 30,
    },
  ],
};

const playerResourcesHeader = {
  id: 'playerResourcesHeader',
  text: 'Player Resources',
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

const resourcesLayout = {
  component: 'Layout',
  padding: 3,
  position: 'top left',
  width,
  height: 100,
  layout: [2, 2],
  children: [
    {
      id: 'playerResourcesTitanium',
      text: '',
      font: {
        size: '18px',
        family: 'Arial',
      },
      component: 'Input',
      position: 'top center',
      width: 160,
      height: 30,
    },
    {
      id: 'playerResourcesSilicium',
      text: '',
      font: {
        size: '18px',
        family: 'Arial',
      },
      component: 'Input',
      position: 'top center',
      width: 160,
      height: 30,
    },
    {
      id: 'playerResourcesUranium',
      text: '',
      font: {
        size: '18px',
        family: 'Arial',
      },
      component: 'Input',
      position: 'top center',
      width: 160,
      height: 30,
    },
    {
      id: 'playerResourcesEnergy',
      text: '',
      font: {
        size: '18px',
        family: 'Arial',
      },
      component: 'Input',
      position: 'top center',
      width: 160,
      height: 30,
    },
  ],
};

const allowedEntitiesHeader = {
  id: 'allowedEntitiesHeader',
  text: 'Allowed Technologies',
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

const allowedEntitiesLayout = {
  id: 'allowedEntitiesLayout',
  component: 'List',
  padding: 3,
  position: {
    x: 0,
    y: 0,
  },
  width: width - 15,
  height: 150,
  layout: [1, 1],
  children: [createTechnologyLayoutDefinition()],
};

const playerSettingsWindow = {
  id: 'playerSettingsWindow',
  component: 'Window',
  header: {
    id: 'ttl',
    skin: 'blueheader',
    position: {
      x: 0,
      y: 0,
    },
    height: 40,
    text: 'Player {0} Settings',
  },
  draggable: true,
  padding: 4,
  position: {
    x: (gameWidth - width) / 2,
    y: (gameHeight - height) / 2,
  },
  width,
  height,
  layout: [1, 12], // one layout block is 64px
  children: [
    closePlayerSettingsButton,
    playerNatureHeader,
    natureLayout,
    playerResourcesHeader,
    resourcesLayout,
    null,
    allowedEntitiesHeader,
    allowedEntitiesLayout,
    null,
    null,
    null,
    null,
  ],
};

function createTechnologyCheckboxDefinition(id) {
  return {
    text: ` ${id}`,
    font: {
      size: '11px',
      family: 'Arial',
    },
    component: 'Checkbox',
    position: 'center',
    width: 30,
    height: 30,
    id: `technologyCheckbox_${id}`,
  };
}

function createTechnologyLayoutDefinition() {
  const techList = getTechnologies();
  const columnPerRow = 3;
  const rows = Math.ceil(techList.length / columnPerRow);
  return {
    component: 'Layout',
    padding: 3,
    draggable: true,
    dragX: false,
    position: 'top left',
    width,
    height: 30 * rows,
    layout: [columnPerRow, rows],
    children: techList.map(entity =>
      createTechnologyCheckboxDefinition(entity)),
  };
}

function getTechnologies() {
  return Object.keys(ENTITIES)
    .filter(category => category !== ENTITY_TAB_MISC)
    .reduce(
      (array, category) => (array = [...array, ...ENTITIES[category]]),
      [],
    );
}

function openWindow(EZGUI, idx) {
  const w = EZGUI.components.playerSettingsWindow;
  w.visible = true;

  updateWindowHeader(idx);
  updateWindowComponents(idx);

  ns.noInputOverlay = true;
}

function updateWindowHeader(idx) {
  const w = EZGUI.components.playerSettingsWindow;
  w.titleBar.text = playerSettingsWindow.header.text.replace('{0}', idx);
}

function updateWindowComponents(idx) {
  const {
    playerNautralCheckbox,
    playerCaptureCheckbox,
    playerResourcesTitanium,
    playerResourcesSilicium,
    playerResourcesUranium,
    playerResourcesEnergy,
  } = EZGUI.components;

  let player = Exporter.getInstance().getPlayer(idx);
  if (!player) player = {};

  playerNautralCheckbox.checked = !!player.independent;
  playerCaptureCheckbox.checked = !!player.capturable;

  playerResourcesTitanium.text = player.titanium || 0;
  playerResourcesSilicium.text = player.silicium || 0;
  playerResourcesUranium.text = player.uranium || 0;
  playerResourcesEnergy.text = player.energy || 0;

  technologies[idx] = player.technologies || {};
  getTechnologies().forEach((id) => {
    const checkbox = EZGUI.components[`technologyCheckbox_${id}`];
    checkbox.checked = !!technologies[idx][id];
  });
}

function addResourceIcon(config) {
  const { game } = ns.game;
  const { parent, frameName } = config;
  const icon = game.add.sprite(0, 0, ICON_SPRITE);
  icon.anchor.set(0.5);
  icon.frameName = frameName;
  icon.x -= icon.width / 2;
  icon.y += icon.height / 2;

  parent.addChild(icon);
}

function addTechnologyIcon(config) {
  const { game } = ns.game;
  const { parent, id } = config;
  const icon = game.add.sprite(0, 0, id);
  const scaleFactor = 30 / 51;
  icon.anchor.set(0.5);
  icon.frame = 2;

  icon.x -= icon.width * scaleFactor / 2;
  icon.y += icon.height * scaleFactor / 2;
  icon.scale.setTo(scaleFactor);

  parent.addChild(icon);
}

function closeWindow(EZGUI) {
  EZGUI.components.playerSettingsWindow.visible = false;
  ns.noInputOverlay = false;
}

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();
  const selector = Selector.getInstance();

  EZGUI.create(playerSettingsWindow, THEME);

  EZGUI.components.closePlayerSettingsButton.on('click', () => {
    eventEmitter.emit('onClosePlayerSettingsWindow');
  });

  eventEmitter.on('onOpenPlayerSettingsWindow', openWindow.bind(null, EZGUI));
  eventEmitter.on('onClosePlayerSettingsWindow', closeWindow.bind(null, EZGUI));

  // -----------------------------------------------------------
  // Player Nature
  // -----------------------------------------------------------
  const neutralButton = EZGUI.components.playerNautralCheckbox;
  const captureButton = EZGUI.components.playerCaptureCheckbox;

  neutralButton.on('click', () => {
    const selectedPlayerIdx = selector.getCurrentPlayerSettingsIdx();
    Exporter.getInstance().setPlayer({
      idx: selectedPlayerIdx,
      independent: !!neutralButton.checked,
      capturable: !!captureButton.checked,
    });
  });

  captureButton.on('click', () => {
    const selectedPlayerIdx = selector.getCurrentPlayerSettingsIdx();
    Exporter.getInstance().setPlayer({
      idx: selectedPlayerIdx,
      independent: !!neutralButton.checked,
      capturable: !!captureButton.checked,
    });
  });

  // -----------------------------------------------------------
  // Player Resources
  // -----------------------------------------------------------
  const {
    playerResourcesTitanium,
    playerResourcesSilicium,
    playerResourcesUranium,
    playerResourcesEnergy,
  } = EZGUI.components;

  addResourceIcon({
    parent: playerResourcesTitanium,
    frameName: ICON_TITANIUM,
  });
  addResourceIcon({
    parent: playerResourcesSilicium,
    frameName: ICON_SILICIUM,
  });
  addResourceIcon({ parent: playerResourcesUranium, frameName: ICON_URANIUM });
  addResourceIcon({ parent: playerResourcesEnergy, frameName: ICON_ENERGY });

  [
    playerResourcesTitanium,
    playerResourcesSilicium,
    playerResourcesUranium,
    playerResourcesEnergy,
  ].forEach((input) => {
    input.domInput.onkeyup = () => {
      const selectedPlayerIdx = selector.getCurrentPlayerSettingsIdx();
      Exporter.getInstance().setPlayer({
        idx: selectedPlayerIdx,
        titanium: playerResourcesTitanium.text,
        silicium: playerResourcesSilicium.text,
        uranium: playerResourcesUranium.text,
        energy: playerResourcesEnergy.text,
      });
    };
  });

  // -----------------------------------------------------------
  // Player Technologies
  // -----------------------------------------------------------
  const techList = getTechnologies();
  techList.forEach((id) => {
    const checkbox = EZGUI.components[`technologyCheckbox_${id}`];
    checkbox.x -= 38;
    addTechnologyIcon({ parent: checkbox, id });

    checkbox.on('click', () => {
      const playerIdx = selector.getCurrentPlayerSettingsIdx();

      if (!technologies[playerIdx]) {
        technologies[playerIdx] = {};
      }
      technologies[playerIdx][id] = checkbox.checked;

      Exporter.getInstance().setPlayer({
        idx: playerIdx,
        technologies: technologies[playerIdx],
      });
    });
  });

  closeWindow(EZGUI);
}

export default {
  create,
};
