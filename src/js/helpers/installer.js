/* global FiveNations */

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

      game.eventEmitter.synced.players.add({
        user: true,
        team: 1,
        authorised: true,
      });

      game.eventEmitter.synced.players.add({
        user: false,
        team: 2,
        authorised: false,
      });

      game.map
        .getStarfield()
        .getFogOfWarRenderer()
        .hide();

      resolve(game);
    });

    app.start();
  });
}

export default installFiveNations;
