/* global window */
import { THEME } from './helpers/consts';
import installFiveNations from './helpers/installer';
import FileWindow from './components/windows/FileWindow';
import MapConfigWindow from './components/windows/MapConfigWindow';
import StarfieldWindow from './components/windows/StarfieldWindow';
import PlayersWindow from './components/windows/PlayersWindow';
import PlayerSettingsWindow from './components/windows/PlayerSettingsWindow';
import EntitiesWindow from './components/windows/EntitiesWindow';
import EffectsWindow from './components/windows/EffectsWindow';

const urlPrefix = window.location;
const EZGUIPublicUrl = 'resources/EZGUI/';

// load EZGUI themes
const themeUrl = `${urlPrefix}${EZGUIPublicUrl}kenney-theme/kenney-theme.json`;

installFiveNations().then((game) => {
  const phaserGame = game.game;

  // shows the loading indicator while EZGUI sets up the layout
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');

  // Set EZGUI renderer
  EZGUI.renderer = phaserGame.renderer;

  // here you can pass multiple themes
  EZGUI.Theme.load([themeUrl], () => {
    // create the gui
    const components = [
      FileWindow,
      MapConfigWindow,
      StarfieldWindow,
      PlayersWindow,
      EntitiesWindow,
      EffectsWindow,
      PlayerSettingsWindow,
    ];

    components.forEach((component) => {
      component.create(game, EZGUI, phaserGame);
    });

    overlay.classList.add('hidden');

    // remove all key listeners so as not to get the keydown captures occupied
    phaserGame.input.keyboard.destroy();
  });
});
