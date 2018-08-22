/* global document, FileReader */
/* eslint no-param-reassign: 0 */
import EventEmitter from './EventEmitter';
import { EVENT_SPACE_OBJECT_SELECTION_CANCELED } from './consts';

let singleton;

/**
 * Function to open the file system selector window and
 * fetch the data from the selected json file
 * @return {Promise}
 */
function loadJSON() {
  return new Promise((resolve, rejected) => {
    const elm = document.getElementById('selectFile');
    elm.click();
    elm.onchange = function onchange(event) {
      const targetFile = event.target.files[0];
      if (!targetFile) {
        rejected();
      }
      const reader = new FileReader();
      reader.onload = function onload(e) {
        const result = JSON.parse(e.target.result);
        resolve(result);
      };
      reader.readAsText(targetFile);
    };
  });
}

/**
 * Helper class to load all the various informations about the map
 */
class Importer {
  /**
   * Returns the map configurations
   */
  getMap() {
    return this.map;
  }

  /**
   * Returns all the space objects
   */
  getSpaceObjects() {
    return this.spaceObjects || [];
  }

  /**
   * Returns all the entities
   */
  getEntities() {
    return this.entities || [];
  }

  /**
   * Returns all the players
   */
  getPlayers() {
    return this.players || {};
  }

  /**
   * Sets the inner state from the selected json
   * @return {Promise}
   */
  import() {
    return loadJSON().then((json) => {
      Object.keys(json).forEach((key) => {
        this[key] = json[key];
      });
    });
  }

  /**
   * Loads all the exported components and entities into the Game
   * @param {object} game - FiveNations Game Scene
   */
  loadMap(game) {
    const local = EventEmitter.getInstance();
    const mapConfig = this.getMap();
    game.map.new(mapConfig);

    game.entityManager.reset();

    this.getEntities().forEach((config) => {
      game.eventEmitter.synced.entities
        .add(config)
        .then(guid => game.entityManager.entities(guid))
        .then((entity) => {
          // if an entity is selected we cancel the starfield selection
          entity.on('select', () => {
            local.emit(EVENT_SPACE_OBJECT_SELECTION_CANCELED);
          });
          // removes the color indicator inside the mapeditor
          entity.colorIndicator.hide();
        });
    });

    this.getSpaceObjects().forEach((config) => {
      game.map
        .getStarfield()
        .getDeepSpaceLayer()
        .add(config);
    });
  }

  /**
   * Sets all the attributes to the given Exporter so that
   * after loading a JSON the exporter takes the state up
   * from where it was left off
   * @param {object} exporter - Exporter instance
   */
  updateExporter(exporter) {
    exporter.players = this.getPlayers();
    exporter.entities = this.getEntities();
    exporter.map = this.getMap();
    exporter.spaceObjects = this.getSpaceObjects();
  }
}

/**
 * Singleton pattern around the main class to make it useble across
 * the whole application
 */
export default {
  getInstance() {
    if (!singleton) {
      singleton = new Importer();
    }
    return singleton;
  },
};
