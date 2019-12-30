/* global window, alert */
import {
  THEME,
  CATEGORY_ENTITIES,
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_ATHRAEL,
  ENTITY_TAB_SYLON,
  ENTITY_TAB_THORUN,
  ENTITY_TAB_ZHOGARN,
  ENTITY_TAB_MISC,
  EVENT_EFFECT_SELECTION_CANCELED,
  EVENT_SPACE_OBJECT_SELECTION_CANCELED,
  EVENT_ENTITY_SELECTION_CANCELED,
} from '../../helpers/consts';
import Utils from '../../helpers/Utils';
import Exporter from '../../helpers/Exporter';
import Selector from '../../helpers/Selector';
import EventEmitter from '../../helpers/EventEmitter';
import EntitiesTabs from '../elements/EntitiesTabs';

const ns = window.fivenations;
const gameWidth = ns.window.width;
const gameHeight = ns.window.height;
const width = 400;
const height = gameHeight;
const offsetExpadend = gameWidth - width;
const offsetClosed = gameWidth;
const hLayoutBlock = 64;
const placementWindow = {
  width: gameWidth,
  height: gameHeight,
};

const tabButtonIds = [
  ENTITY_TAB_FEDERATION,
  ENTITY_TAB_ATHRAEL,
  ENTITY_TAB_SYLON,
  ENTITY_TAB_THORUN,
  ENTITY_TAB_ZHOGARN,
  ENTITY_TAB_MISC,
];

const defaultTabId = ENTITY_TAB_FEDERATION;

const tabButtonConfig = {
  width: 50,
  height: 40,
};

let expanded = false;
let animating = false;
const activeTab = ENTITY_TAB_FEDERATION;

const canBePlacedOnTopOfObstacles = [
  'asteroidsilicon1',
  'asteroidsilicon2',
  'asteroidsiliconsmall1',
  'asteroidsiliconsmall2',
  'asteroidtitanium1',
  'asteroidtitanium2',
  'asteroidtitaniumsmall1',
  'asteroidtitaniumsmall2',
  'asteroiduranium1',
  'asteroiduranium2',
  'asteroiduraniumsmall1',
  'asteroiduraniumsmall2',
  'asteroid1',
  'asteroid2',
  'asteroid3',
  'asteroid4',
  'asteroidbig1',
  'asteroidbig2',
  'asteroidgigantic1',
  'asteroidgigantic2',
  'asteroidgigantic3',
  'asteroidgigantic4',
  'asteroidgigantic5',
  'asteroidgigantic6',
  'asteroidgigantic7',
  'asteroidgigantic8',
  'asteroidgigantic9',
  'asteroidgigantic10',
  'asteroidice1',
  'asteroidice2',
  'asteroidicesmall1',
  'asteroidicesmall2',
  'asteroidmagma1',
  'asteroidmagma2',
  'asteroidmagma3',
  'asteroidmagma4',
  'asteroidsmall1',
  'asteroidsmall2',
  'asteroidsmall3',
  'asteroidsmall4',
  'asteroidswarm1',
  'asteroidswarm2',
  'asteroidswarm3',
  'asteroidswarm4',
  'asteroidswarm5',
  'asteroidswarm6',
  'asteroidswarm7',
  'asteroidswarm8',
  'obj_asteroids_ice1',
  'obj_asteroids_ice2',
  'obj_asteroids_ice3',
  'obj_asteroids_ice4',
  'obj_asteroids_ice5',
  'obj_asteroids_ice6',
  'obj_asteroids_ice7',
  'obj_asteroids_ice8',
  'obj_asteroids_ice9',
  'obj_asteroids_ice10',
  'obj_asteroids_ice11',
  'obj_asteroids_ice12',
  'obj_asteroids_ice13',
  'obj_asteroids_ice14',
  'obj_asteroids_ice15',
  'obj_asteroids_ice16',
  'obj_asteroids_ice17',
  'obj_asteroids_ice18',
  'obj_asteroids_ice19',
  'obj_asteroids_ice20',
  'obj_asteroids_normal1',
  'obj_asteroids_normal2',
  'obj_asteroids_normal3',
  'obj_asteroids_normal4',
  'obj_asteroids_normal5',
  'obj_asteroids_normal6',
  'obj_asteroids_normal7',
  'obj_asteroids_normal8',
  'obj_asteroids_normal9',
  'obj_asteroids_normal10',
  'obj_asteroids_normal11',
  'obj_asteroids_normal12',
  'obj_asteroids_normal13',
  'obj_asteroids_normal14',
  'obj_asteroids_normal15',
  'obj_asteroids_normal16',
  'obj_asteroids_normal17',
  'obj_asteroids_normal18',
  'obj_asteroids_normal19',
  'obj_asteroids_normal20',
  'obj_asteroids_normal21',
  'obj_asteroids_normal22',
  'obj_asteroids_vulcanic1',
  'obj_asteroids_vulcanic2',
  'obj_asteroids_vulcanic3',
  'obj_asteroids_vulcanic4',
  'obj_asteroids_vulcanic5',
  'obj_asteroids_vulcanic6',
  'obj_asteroids_vulcanic7',
  'obj_asteroids_vulcanic8',
  'obj_asteroids_vulcanic9',
  'obj_asteroids_vulcanic10',
  'obj_asteroids_vulcanic11',
  'obj_asteroids_vulcanic12',
  'obj_asteroids_vulcanic13',
  'obj_asteroids_vulcanic14',
  'obj_asteroids_vulcanic15',
  'obj_asteroids_vulcanic16',
  'obj_asteroids_vulcanic17',
  'obj_asteroids_vulcanic18',
  'obj_asteroids_vulcanic19',
  'obj_asteroids_vulcanic20',
  'obj_asteroids_vulcanic21',
  'obj_chokypuff1',
  'obj_chokypuff2',
  'obj_chokypuff3',
  'obj_chokypuff4',
  'obj_chokypuff5',
  'obj_chokypuff6',
  'obj_chokypuff7',
  'obj_chokypuff8',
  'obj_chokypuff9',
  'obj_chokypuff10',
  'obj_chokypuff11',
  'obj_chokypuff12',
  'obj_chokypuff13',
  'obj_chokypuff14',
  'obj_chokypuff15',
  'obj_chokypuff16',
  'obj_chokypuff17',
  'obj_izlar_extremophytes1',
  'obj_izlar_extremophytes2',
  'obj_izlar_extremophytes3',
  'obj_izlar_extremophytes4',
  'obj_izlar_extremophytes5',
  'obj_izlar_extremophytes6',
  'obj_izlar_extremophytes7',
  'obj_izlar_extremophytes8',
  'obj_izlar_izlaroflora1',
  'obj_izlar_izlaroflora2',
  'obj_izlar_izlaroflora3',
  'obj_izlar_izlaroflora4',
  'obj_izlar_izlaroflora5',
  'obj_izlar_izlaroflora6',
  'obj_izlar_izlaroflora7',
  'obj_izlar_izlaroflora8',
  'obj_izlar_izlaroflora9',
  'obj_izlar_izlaroflora10',
  'obj_izlar_izlaroflora11',
  'obj_izlar_jellytree1',
  'obj_izlar_jellytree2',
  'obj_izlar_jellytree3',
  'obj_lonsdaleites1',
  'obj_lonsdaleites2',
  'obj_lonsdaleites3',
  'obj_lonsdaleites4',
  'obj_lonsdaleites5',
  'obj_lonsdaleites6',
  'obj_lonsdaleites7',
  'obj_lonsdaleites8',
  'obj_sylonwalls1',
  'obj_sylonwalls2',
  'obj_sylonwalls3',
  'obj_frozen_cloud1',
  'obj_frozen_cloud2',
  'obj_frozen_cloud3',
  'obj_frozen_cloud4',
  'obj_frozen_cloud5',
  'obj_frozen_cloud6',
  'obj_frozen_cloud7',
  'obj_frozen_cloud8',
  'obj_frozen_cloud9',
  'obj_frozen_cloud10',
  'obj_frozen_cloud11',
  'obj_frozen_cloud12',
  'obj_frozen_cloud13',
  'obj_frozen_cloud14',
  'obj_frozen_cloud15',
  'obj_frozen_cloud16',
  'obj_frozen_cloud17',
  'obj_frozen_cloud18',
  'obj_frozen_cloud19',
  'obj_frozen_cloud20',
  'obj_frozen_cloud21',
  'obj_frozen_cloud22',
  'obj_frozen_cloud23',
  'obj_frozen_cloud24',
  'obj_fed_wall1',
  'obj_fed_wall2',
  'obj_fed_wall3',
  'obj_fed_wall4',
  'obj_fed_wall5',
  'obj_fed_wall6',
  'obj_fed_wall7',
  'obj_fed_wall8',
  'obj_fed_wall9',
  'obj_fed_wall10',
  'obj_fed_wall11',
  'obj_fed_wall12',
  'obj_fed_wall13',
  'obj_fed_wall14',
  'obj_fed_wall15',
  'obj_fed_wall16',
  'obj_fed_wall17',
  'wrecksilicon1',
  'wrecksilicon2',
  'wrecksilicon3',
  'wrecktitanium1',
  'wrecktitanium2',
  'wrecktitanium3',
  'wrecktitanium4',
  'wrecktitanium5',
  'wrecktitanium6',
  'wrecktitanium7',
  'plasmoid',
];

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
    y: 164,
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

const resetEntitiesSelectionButton = {
  id: 'resetEntitiesSelectionButton',
  text: 'Reset',
  font: {
    size: '12px',
    family: 'Arial',
  },
  component: 'Button',
  position: {
    x: 46,
    y: 6,
  },
  width: 75,
  height: 40,
};

function createTabButton(id) {
  return {
    id: `entitiesWindowTabButton${id}`,
    text: id,
    font: {
      size: '14px',
      family: 'Arial',
    },
    component: 'Button',
    skin: 'bluebutton',
    position: 'top left',
    width: tabButtonConfig.width,
    height: tabButtonConfig.height,
  };
}

function createEntityTabLayout() {
  const buttonCount = tabButtonIds.length;
  return {
    id: 'entitiesWindowTabLayout',
    component: 'Layout',
    padding: 3,
    position: 'top left',
    width: (tabButtonConfig.width + 6) * buttonCount,
    height: tabButtonConfig.height + 6,
    layout: [buttonCount, 1],
    children: tabButtonIds.map(id => createTabButton(id)),
  };
}

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
    {
      id: 'entitiesHeaderButtonsLayout',
      component: 'Layout',
      position: 'top left',
      padding: 3,
      width: width - 15,
      height: 60,
      layout: [10, 1],
      children: [closeEntitiesButton, resetEntitiesSelectionButton],
    },
    createEntityTabLayout(),
    EntitiesTabs.getGUIDefinition(ENTITY_TAB_FEDERATION),
    EntitiesTabs.getGUIDefinition(ENTITY_TAB_ATHRAEL),
    EntitiesTabs.getGUIDefinition(ENTITY_TAB_SYLON),
    EntitiesTabs.getGUIDefinition(ENTITY_TAB_THORUN),
    EntitiesTabs.getGUIDefinition(ENTITY_TAB_ZHOGARN),
    EntitiesTabs.getGUIDefinition(ENTITY_TAB_MISC),
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

function toogleTab(tab, tabs) {
  tabs.forEach((obj) => {
    obj.x = 3;
    obj.y = 144;
    obj.visible = obj === tab;
  });
}

function addEventListenersToTabButtons(EZGUI) {
  const tabs = tabButtonIds.map(id => EZGUI.components[`entitiesTab${id}`]);
  const buttons = tabButtonIds.map(id => EZGUI.components[`entitiesWindowTabButton${id}`]);

  const defaultTab = EZGUI.components[`entitiesTab${defaultTabId}`];
  toogleTab(defaultTab, tabs);

  buttons.forEach((button) => {
    const id = button.text;
    const tab = EZGUI.components[`entitiesTab${id}`];
    button.on('click', () => {
      toogleTab(tab, tabs);
    });
  });
}

function placeEntity(game, config) {
  const local = EventEmitter.getInstance();
  const guid = Utils.getGUID();
  const extendedConfig = {
    guid,
    ...config,
  };
  game.eventEmitter.synced.entities
    .add(extendedConfig)
    .then(guid => game.entityManager.getEntityByGUID(guid))
    .then((entity) => {
      // if an entity is selected we cancel the starfield selection
      entity.on('select', () => {
        local.emit(EVENT_SPACE_OBJECT_SELECTION_CANCELED);
        local.emit(EVENT_EFFECT_SELECTION_CANCELED);
      });
    });

  Exporter.getInstance().addEntity(extendedConfig);
}

function addPlacementListener(game, EZGUI, phaserGame) {
  game.userPointer.on('leftbutton/down', (mousePointer) => {
    let coords = mousePointer.getRealCoords();
    const selector = Selector.getInstance();
    const z = EZGUI.components.spaceObjectsAttributeZ.value * 0.9 + 0.1;
    const scale = EZGUI.components.spaceObjectsAttributeScale.value + 1;
    const tabWidth = expanded ? width : 0;

    if (ns.noInputOverlay) return;

    if (coords.x - phaserGame.camera.x >= placementWindow.width) return;
    if (coords.y - phaserGame.camera.y >= placementWindow.height) return;
    // minimap
    if (
      coords.x - phaserGame.camera.x <= 182 &&
      coords.y - phaserGame.camera.y > placementWindow.height - 178
    ) {
      return;
    }
    if (!selector.isActive()) return;
    if (selector.getCategory() !== CATEGORY_ENTITIES) return;
    if (!selector.getSelectedPlayer()) {
      alert('Select a Player first in the Player Window!');
      return;
    }

    if (ns.BPDActivated) {
      const BPD = ns.game.GUI.getBuildingPlacementDisplay();

      // if the entity cannot be placed to the selected area and it's
      // not in the list of entities that can share tiles with obstacles
      if (
        !BPD.canConstructThere() &&
        canBePlacedOnTopOfObstacles.indexOf(selector.getId()) === -1
      ) {
        return;
      }

      // updates the coordinates based on the BPD position
      coords = BPD.getPlacementCoords();
    }

    placeEntity(game, {
      id: selector.getId(),
      x: coords.x,
      y: coords.y,
      playerId: selector.getSelectedPlayer(),
    });
  });
}

function addRemoveListener(game) {
  game.userKeyboard.on('key/delete', () => {
    game.entityManager.getSelectedEntities().forEach((entity) => {
      Exporter.getInstance().removeEntityByGUID(entity.getGUID());
    });
  });
}

function addRightMouseButtonListener(game) {
  game.userPointer.on('rightbutton/down', () => {
    ns.BPDActivated = false;
    Selector.getInstance().reset();
  });
}

function addSetHeaderListener(game) {
  game.userPointer.on('rightbutton/down', (mousePointer) => {
    if (ns.noInputOverlay) return;

    const coords = mousePointer.getRealCoords();

    const entityManager = game.entityManager;
    const entities = entityManager.getSelectedEntities();

    if (entities.length) {
      entities.forEach((entity) => {
        Exporter.getInstance().updateEntityByGUID(entity.getGUID(), {
          headToCoords: coords,
        });
        entity.headToCoords(coords);
      });
    }
  });
}

function addSelectionListener(game) {
  const eventEmitter = EventEmitter.getInstance();
  const entityManager = game.entityManager;
  eventEmitter.on(EVENT_ENTITY_SELECTION_CANCELED, () => {
    setTimeout(() => {
      entityManager.entities().forEach(entity => entity.unselect());
    }, 0);
  });
}

function create(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();

  EZGUI.create(entitiesWindow, THEME);
  EZGUI.create(openEntitiesButton, THEME);

  const openButton = EZGUI.components.openEntitiesButton;
  const closeButton = EZGUI.components.closeEntitiesButton;
  const resetButton = EZGUI.components.resetEntitiesSelectionButton;

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

  resetButton.on('click', () => {
    const BPD = ns.game.GUI.getBuildingPlacementDisplay();
    BPD.deactivate();
    ns.BPDActivated = false;
    Selector.getInstance().reset();
  });

  eventEmitter.on('windowOpened', () => {
    placementWindow.width = gameWidth - width;
  });

  eventEmitter.on('windowClosed', () => {
    placementWindow.width = gameWidth - openEntitiesButton.width;
  });

  EntitiesTabs.addEventListeners(game, EZGUI, phaserGame);
  addEventListenersToTabButtons(EZGUI);
  addSelectionListener(game);
  addPlacementListener(game, EZGUI, phaserGame);
  addRemoveListener(game);
  addRightMouseButtonListener(game);
  addSetHeaderListener(game);
}

export default {
  create,
};
