/* global Phaser, FiveNations, window */
import { PLAYERS_COUNT } from './consts';
import SelectorDisplay from './SelectorDisplay';

const ns = window.fivenations;
const canvasElmId = 'fivenations-game';

const app = new FiveNations({
  skipScenes: true,
  canvasElmId,
});

const scriptBox = FiveNations.Scriptbox.getInstance();

ns.debug = {};
ns.debug.grid = true;
ns.debug.noMusic = true;
ns.mapEditorMode = true;
window.editor = true;

/**
 * Appends the SelectorDisplay component to the GUI graphics group
 * note: SelectorDisplay element exists only in map editor
 */
function addSelectorDisplayToGameStage() {
  SelectorDisplay.addToWorld();
}

/**
 * Removes the keyboard listeners that are not needed in mapeditor mode
 */
function removeKeyboardListeners(game) {
  game.input.keyboard.removeKey(Phaser.Keyboard.BACKSPACE);
}

function installFiveNations() {
  return new Promise((resolve) => {
    scriptBox.add('default', (game) => {
      // default map
      game.map.new({
        width: 96,
        height: 96,
      });

      // we generate all the players beforehand, but will
      // export only the activated ones
      for (let i = 0, l = PLAYERS_COUNT; i < l; i += 1) {
        const user = i === 0;
        game.eventEmitter.synced.players.add({
          id: i + 1,
          authorised: user,
          user,
        });

        // reveal fog of war for all players
        game.map.getFogOfWar().blackSheepWall(i + 1);
      }

      addSelectorDisplayToGameStage();
      removeKeyboardListeners(game);

      // make control panel disappear
      game.GUI.getControlPanel().visible = false;

      resolve(game);
    });

    app.start();
  });
}

export default installFiveNations;
