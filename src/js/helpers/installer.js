/* global FiveNations */
import { PLAYERS_COUNT } from './consts';

const canvasElmId = 'fivenations-game';
const app = new FiveNations({ canvasElmId });
const scriptBox = FiveNations.Scriptbox.getInstance();

function installFiveNations() {
  return new Promise((resolve) => {
    scriptBox.add('default', (game) => {
      game.map.new({
        width: 96,
        height: 96,
      });

      // we generate all the players beforehand, but will
      // export only the activated ones
      for (let i = 0, l = PLAYERS_COUNT; i < l; i += 1) {
        const user = i === 0;
        game.eventEmitter.synced.players.add({
          team: i + 1,
          authorised: user,
          user,
        });
      }

      game.map.getFogOfWarRenderer().hide();

      resolve(game);
    });

    app.start();
  });
}

export default installFiveNations;
