/* global window */
import Selector from '../../helpers/Selector';
import Exporter from '../../helpers/Exporter';
import EventEmitter from '../../helpers/EventEmitter';
import { PLAYERS_COUNT } from '../../helpers/consts';

const ns = window.fivenations;
const width = 400;

function createPlayerRow(i) {
  return {
    component: 'Layout',
    padding: 3,
    position: 'top left',
    width: width - 30,
    height: 40,
    layout: [12, 1],
    children: [
      {
        id: `playerIdLabel${i}`,
        text: `Player ${i}`,
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
      null,
      {
        id: `playerSettingsButton${i}`,
        text: 'Settings',
        font: {
          size: '12px',
          family: 'Arial',
        },
        component: 'Button',
        skin: 'bluebutton',
        position: 'center',
        width: 90,
        height: 30,
      },
      null,
      {
        id: `playerActiveCheckbox${i}`,
        text: ' Active',
        font: {
          size: '14px',
          family: 'Arial',
        },
        component: 'Checkbox',
        position: 'top left',
        width: 30,
        height: 30,
      },
      null,
      null,
      {
        id: `selectPlayerRadio${i}`,
        group: 'selectPlayerRadioGroup',
        text: ' Selected',
        font: {
          size: '14px',
          family: 'Arial',
        },
        component: 'Radio',
        position: 'top left',
        width: 30,
        height: 30,
      },
    ],
  };
}

function createPlayerRows() {
  const output = [];
  for (let i = 0, l = PLAYERS_COUNT; i < l; i += 1) {
    output.push(createPlayerRow(i + 1));
  }
  return output;
}

function getGUIDefinition() {
  return {
    component: 'Layout',
    padding: 3,
    position: 'top left',
    width: width - 15,
    height: 500,
    layout: [1, 12],
    children: createPlayerRows(),
  };
}

function toggleButton(button) {
  if (button.disabled) {
    button.disabled = false;
    button.alpha = 1;
  } else {
    button.disabled = true;
    button.alpha = 0.25;
  }
}

function toggleSettingsButtonById(id) {
  const button = EZGUI.components[`playerSettingsButton${id}`];
  toggleButton(button);
}

function addButtonListeners(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();
  const playerManager = fivenations.game.playerManager;
  for (let i = 1, l = PLAYERS_COUNT; i <= l; i += 1) {
    const settingsButton = EZGUI.components[`playerSettingsButton${i}`];
    // refines coordinates
    settingsButton.x -= 10;
    settingsButton.y -= 4;
    toggleButton(settingsButton);
    settingsButton.on('click', () => {
      if (settingsButton.disabled) return;
      Selector.getInstance().selectPlayerSettings(i);
      eventEmitter.emit('onOpenPlayerSettingsWindow', i);
    });

    const radio = EZGUI.components[`selectPlayerRadio${i}`];
    radio.on('click', () => {
      Selector.getInstance().selectPlayer(i);
      // selects the given player as user
      playerManager.user = undefined; // clears the cache
      playerManager.getPlayers().forEach((player) => {
        player.user = player.getTeam() === i;
      });
    });

    const activeButton = EZGUI.components[`playerActiveCheckbox${i}`];

    [activeButton].forEach((button) => {
      button.on('click', () => {
        toggleButton(settingsButton);

        Exporter.getInstance().setPlayer({
          idx: i,
          team: i,
          active: !!activeButton.checked,
        });
      });
    });
  }
}

function addEventListeners(game, EZGUI, phaserGame) {
  addButtonListeners(game, EZGUI, phaserGame);
}

export default {
  addEventListeners,
  toggleSettingsButtonById,
  getGUIDefinition,
};
