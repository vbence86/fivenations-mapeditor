/* global window */
import Selector from '../../helpers/Selector';
import Exporter from '../../helpers/Exporter';
import EventEmitter from '../../helpers/EventEmitter';
import { PLAYERS_COUNT, PLAYER_MANAGER_COLORS } from '../../helpers/consts';
import StartLocationManager from '../../helpers/StartLocationManager';

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

function enableButton(button) {
  button.disabled = false;
  button.alpha = 1;
}

function disableButton(button) {
  button.disabled = true;
  button.alpha = 0.25;
}

function toggleButton(button) {
  if (button.disabled) {
    enableButton(button);
  } else {
    disableButton(button);
  }
}

function activatePlayer(id) {
  const activeButton = EZGUI.components[`playerActiveCheckbox${id}`];
  const settingsButton = EZGUI.components[`playerSettingsButton${id}`];

  activeButton.checked = true;
  enableButton(settingsButton);
}

function deactivePlayer(id) {
  const activeButton = EZGUI.components[`playerActiveCheckbox${id}`];
  const settingsButton = EZGUI.components[`playerSettingsButton${id}`];

  activeButton.checked = false;
  disableButton(settingsButton);

  const manager = StartLocationManager.getInstance();
  manager.delete(id);
}

function addButtonListeners(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();
  const playerManager = fivenations.game.playerManager;
  for (let i = 1, l = PLAYERS_COUNT; i <= l; i += 1) {
    const settingsButton = EZGUI.components[`playerSettingsButton${i}`];
    // refines coordinates
    settingsButton.x -= 10;
    settingsButton.y -= 4;
    disableButton(settingsButton);
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
        player.user = player.getId() === i;
      });
    });

    const activeButton = EZGUI.components[`playerActiveCheckbox${i}`];

    [activeButton].forEach((button) => {
      button.on('click', () => {
        toggleButton(settingsButton);

        Exporter.getInstance().setPlayer({
          id: i,
          active: !!activeButton.checked,
        });
      });
    });

    // colorize labels
    const label = EZGUI.components[`playerIdLabel${i}`];
    const color = PLAYER_MANAGER_COLORS[i - 1].replace('0x', '#');
    label.textObj.addColor(color, 0);
    label.textObj.setShadow(1, 1, 'rgba(0,0,0,0.5)', 3);
  }
}

function addImportListeners(game, EZGUI, phaserGame) {
  const eventEmitter = EventEmitter.getInstance();
  eventEmitter.on('onPlayersImported', (players) => {
    for (let i = 1, l = PLAYERS_COUNT; i <= l; i += 1) {
      if (players[i] && players[i].active) {
        activatePlayer(i);
      } else {
        deactivePlayer(i);
      }
    }
  });
}

function addEventListeners(game, EZGUI, phaserGame) {
  addButtonListeners(game, EZGUI, phaserGame);
  addImportListeners(game, EZGUI, phaserGame);
}

export default {
  addEventListeners,
  getGUIDefinition,
};
