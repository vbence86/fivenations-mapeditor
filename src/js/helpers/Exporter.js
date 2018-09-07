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
   * Updates the entity identified by the given guid with the given
   * additional config attributes
   * @param {string} guid - GUID string
   * @param {object} config
   */
  updateEntityByGUID(guid, config) {
    this.entities.forEach((data, idx) => {
      if (data.guid !== guid) return;
      this.entities[idx] = {
        ...data,
        ...config,
      };
    });
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
   * Saves the config object used to add a Location to the world
   * @param {object} config - Contains all required information about the Location
   */
  addLocation(config) {
    if (!this.locations) {
      this.locations = [];
    }
    this.locations.push({
      id: config.id,
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
    });
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
   * Removes the saved configuration of a location
   * @param {object} location - Location instance
   */
  removeLocation(location) {
    if (!this.locations) {
      return;
    }
    for (let i = 0, l = this.locations.length; i < l; i += 1) {
      if (this.locations[i] === location) {
        this.locations.splice(i, 1);
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
    this.players[idx] = {
      ...this.players[idx],
      ...config,
    };
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
    this.locations = undefined;
  }

  /**
   * Returns the array of entities to be exported
   * @return {object} array
   */
  getEntities() {
    return this.entities || [];
  }

  /**
   * Returns the array of effects to be exported
   * @return {object} array
   */
  getEffects() {
    return this.effects || [];
  }

  /**
   * Returns the array of space objects to be exported
   * @return {object} array
   */
  getSpaceObjects() {
    return this.spaceObjects || [];
  }

  /**
   * Returns the array of locations to be exported
   * @return {object} array
   */
  getLocations() {
    return this.locations;
  }

  /**
   * Returns the player identified by the given id number
   * @param {number} id - id of the player
   */
  getPlayer(id) {
    if (!this.players) return null;
    return this.players[id];
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
