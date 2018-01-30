/* global window */
import installFiveNations from './helpers/installer';
import guiObj from './components/main';

const EZGUIPublicUrl = 'resources/EZGUI/';
const { fivenations } = window;

// load EZGUI themes
const themeUrl = `${EZGUIPublicUrl}metalworks-theme/metalworks-theme.json`;

installFiveNations().then((game) => {
  // Set EZGUI renderer
  EZGUI.renderer = game.renderer;

  // here you can pass multiple themes
  EZGUI.Theme.load([themeUrl], () => {
    // create the gui
    const guiContainer = EZGUI.create(guiObj, 'metalworks');
    EZGUI.components.btn1.on('click', (event) => {
      console.log('clicked', event);
    });
  });
});
