/* global window, document, Blob, MouseEvent */
/* eslint no-param-reassign: 0 */
let singleton;

// Default map configuration object
const defaultMapConfig = {
  width: 96,
  height: 96,
};

/**
 * Function to download the given JSON as a json file through browser
 * adapted from http://bgrins.github.io/devtools-snippets/#console-save
 * @param {object} data -- json object to save
 * @param {string} file -- file name to save to
 */
function saveJSON(data, filename = 'export.json') {
  if (!data) {
    return;
  }

  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4);
  }

  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  const evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['application/json', a.download, a.href].join(':');
  a.dispatchEvent(evt);
}

/**
 * Helper class to collect all the various informations about the map
 * that can be turned into JSON format and downloaded through the browser
 */
class Exporter {
  /**
   * Sets default export values
   */
  constructor() {
    this.map = defaultMapConfig;
  }

  /**
   * Persits the given basic configuration of the map
   * @param {object} map - Holds the fundamental information about the current map
   */
  setMap(map) {
    // no hocus-pocus here, we can directly save it
    this.map = map;
  }

  /**
   * Persists the configuration details of to the given SpaceObject
   * @param {object} config - Contains all required information about the SpaceObject
   */
  addSpaceObject(config) {
    if (!this.spaceObjects) {
      this.spaceObjects = [];
    }
    this.spaceObjects.push(config);
  }

  /**
   * Saves the config object used to add an Entity to the world
   * @param {object} config - Contains all required information about the Entity
   */
  addEntity(config) {
    if (!this.entities) {
      this.entities = [];
    }
    this.entities.push(config);
  }

  /**
   * Saves the config object used to add an Effect to the world
   * @param {object} config - Contains all required information about the Effect
   */
  addEffect(config) {
    if (!this.effects) {
      this.effects = [];
    }
    this.effects.push(config);
  }

  /**
   * Removes the saved configuration of an entity identified by the given GUID
   * @param {number} guid
   */
  removeEntityByGUID(guid) {
    if (!this.entities) {
      return;
    }
    for (let i = 0, l = this.entities.length; i < l; i += 1) {
      if (this.entities[i].guid === guid) {
        this.entities.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Removes the saved configuration of an effect identified by the given GUID
   * @param {number} guid
   */
  removeEffectByGUID(guid) {
    if (!this.effects) {
      return;
    }
    for (let i = 0, l = this.effects.length; i < l; i += 1) {
      if (this.effects[i].guid === guid) {
        this.effects.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Removes the saved configuration of the given spaceObject
   * @param {object} spaceObject
   */
  removeSpaceObject(spaceObject) {
    if (!this.spaceObjects) {
      return;
    }
    for (let i = this.spaceObjects.length - 1; i >= 0; i -= 1) {
      if (
        this.spaceObjects[i].x === spaceObject.x &&
        this.spaceObjects[i].y === spaceObject.y &&
        this.spaceObjects[i].z === spaceObject.z
      ) {
        this.spaceObjects.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Creates or Overwrites the given player attributes by the idx attr
   * @param {object} player attributes
   */
  setPlayer(config) {
    const { idx } = config;
    if (!this.players) {
      this.players = {};
    }
    if (!this.players[idx]) {
      this.players[idx] = {};
    }
    this.players[idx] = config;
  }

  /**
   * Converts all the passed data to JSON format
   * @return {string} JSON formatted map data
   */
  export() {
    return JSON.stringify(this);
  }

  /**
   * Triggers a native download of the exported JSON
   */
  download(filename) {
    saveJSON(this.export(), filename || 'map.json');
  }

  /**
   * Resets the exporter content
   */
  reset() {
    this.players = undefined;
    this.entities = undefined;
    this.effects = undefined;
    this.spaceObjects = undefined;
  }

  /**
   * Returns the array of effects to be exported
   */
  getEntities() {
    return this.entities || [];
  }

  /**
   * Returns the array of effects to be exported
   */
  getEffects() {
    return this.effects || [];
  }

  /**
   * Returns the array of effects to be exported
   */
  getSpaceObjects() {
    return this.spaceObjects || [];
  }
}

/**
 * Singleton pattern around the main class to make it useble across
 * the whole application
 */
export default {
  getInstance() {
    if (!singleton) {
      singleton = new Exporter();
    }
    return singleton;
  },
};
