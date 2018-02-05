/* global window */
import { THEME } from './helpers/consts';
import installFiveNations from './helpers/installer';
import MapConfigWindow from './components/windows/MapConfigWindow';
import StarfieldWindow from './components/windows/StarfieldWindow';
import PlayersWindow from './components/windows/PlayersWindow';
import EntitiesWindow from './components/windows/EntitiesWindow';

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
    const components = [
      MapConfigWindow,
      StarfieldWindow,
      PlayersWindow,
      EntitiesWindow,
    ];

    components.forEach((component) => {
      component.create(game, EZGUI, phaserGame);
    });
  });
});
