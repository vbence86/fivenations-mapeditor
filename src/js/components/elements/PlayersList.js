/* global window */
import Selector from '../../helpers/Selector';
import Exporter from '../../helpers/Exporter';
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
        id: `playerNautralCheckbox${i}`,
        text: ' Neutral',
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

function addButtonListeners(game, EZGUI, phaserGame) {
  const playerManager = fivenations.game.playerManager;
  for (let i = 1, l = PLAYERS_COUNT; i <= l; i += 1) {
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
    const neutralButton = EZGUI.components[`playerNautralCheckbox${i}`];

    [activeButton, neutralButton].forEach((button) => {
      button.on('click', () => {
        Exporter.getInstance().setPlayer({
          idx: i,
          team: i,
          active: !!activeButton.checked,
          independent: !!neutralButton.checked,
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
  getGUIDefinition,
};
