/* global window */
import { THEME } from './helpers/consts';
import installFiveNations from './helpers/installer';
import StartLocationManager from './helpers/StartLocationManager';
import FileWindow from './components/windows/FileWindow';
import MapConfigWindow from './components/windows/MapConfigWindow';
import StarfieldWindow from './components/windows/StarfieldWindow';
import PlayersWindow from './components/windows/PlayersWindow';
import PlayerSettingsWindow from './components/windows/PlayerSettingsWindow';
import EntitiesWindow from './components/windows/EntitiesWindow';
import EffectsWindow from './components/windows/EffectsWindow';
import LocationsWindow from './components/windows/LocationsWindow';

const urlPrefix = window.location;
const EZGUIPublicUrl = 'resources/EZGUI/';

// load EZGUI themes
const themeUrl = `${urlPrefix}${EZGUIPublicUrl}kenney-theme/kenney-theme.json`;

/**
 * Shows HTML overlay on the top of the game stage
 */
function showPreloadOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
}

/**
 * Makes the HTML overlay on the top of the game stage disappear
 */
function hidePreloadOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('hidden');
}

/**
 * Preloads all additional assets that is required for the complete
 * map-editor functonalities
 * @param {object} Phaser.Game instance
 * @return {Promise} Promise resolved with Phaser.Game instance
 */
function preloadMapEditorAssets(game) {
  return new Promise((resolve) => {
    const loader = new Phaser.Loader(game.game);

    loader.crossOrigin = 'anonymous';
    loader.onLoadComplete.add(() => {
      resolve(game);
    });

    loader.image('map-startlocation', 'resources/images/startlocation.png');

    loader.start();
  });
}

/**
 * Creates all the predefined EZGUI components and attaches it to
 * the game stage
 * @param {object} Phaser.Game instance
 * @return {Promise} Promise resolved with Phaser.Game instance
 */
function installEZGUI(game) {
  return new Promise((resolve) => {
    const phaserGame = game.game;

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
        LocationsWindow,
      ];

      components.forEach((component) => {
        component.create(game, EZGUI, phaserGame);
      });

      resolve(game);
    });
  });
}

// main entry point to the mapeditor application
installFiveNations()
  .then((game) => {
    showPreloadOverlay();
    return game;
  })
  .then(preloadMapEditorAssets)
  .then(installEZGUI)
  .then(hidePreloadOverlay);
