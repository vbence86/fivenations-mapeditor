/* global window, document, Blob, MouseEvent */
/* eslint no-param-reassign: 0 */
let singleton;

/**
 * Function to open the file system selector window and
 * fetch the data from the selected json file
 * @return {Promise}
 */
function loadJSON() {
  return new Promise((resolve, rejected) => {
    const files = document.getElementById('selectFiles').files;
    if (files && files.length <= 0) {
      rejected();
    }
    const fr = new FileReader();
    fr.onload = function (e) {
      const result = JSON.parse(e.target.result);
      const formatted = JSON.stringify(result, null, 2);
      resolve(formatted);
    };

    fr.readAsText(files.item(0));
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
    return this.spaceObjects;
  }

  /**
   * Returns all the entities
   */
  getEntities() {
    return this.entities;
  }

  /**
   * Returns all the players
   */
  getPlayers() {
    return this.players;
  }

  /**
   * Sets the inner state from the selected json
   * @return {Promise}
   */
  import() {
    return loadJSON((json) => {
      Object.keys(json).forEach((key) => {
        this[key] = json[key];
      });
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
