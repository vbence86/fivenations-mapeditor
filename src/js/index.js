/* global window */
import installFiveNations from './helpers/installer';
import mainWindow, { registerEventListeners } from './components/mainWindow';

const urlPrefix = window.location;
const EZGUIPublicUrl = 'resources/EZGUI/';

// load EZGUI themes
const themeUrl = `${urlPrefix}${EZGUIPublicUrl}kenney-theme/kenney-theme.json`;

installFiveNations().then((game) => {
  const phaserGame = game.game;
  // Set EZGUI renderer
  EZGUI.renderer = phaserGame.renderer;

  // here you can pass multiple themes
  EZGUI.Theme.load([themeUrl], () => {
    // create the gui
    EZGUI.create(mainWindow, 'kenney');
    registerEventListeners(game, EZGUI, phaserGame);
  });
});
