/* global window */
import installFiveNations from './helpers/installer';
import guiObj from './components/main';

const urlPrefix = window.location;
const EZGUIPublicUrl = 'resources/EZGUI/';

// load EZGUI themes
const themeUrl = `${urlPrefix}${EZGUIPublicUrl}kenney-theme/kenney-theme.json`;

installFiveNations().then((game) => {
  // Set EZGUI renderer
  EZGUI.renderer = game.game.renderer;

  // here you can pass multiple themes
  EZGUI.Theme.load([themeUrl], () => {
    // create the gui
    const guiContainer = EZGUI.create(guiObj, 'kenney');
    EZGUI.components.btn1.on('click', (event) => {
      console.log('clicked', event);
    });
  });
});
