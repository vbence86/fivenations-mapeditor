/* eslint class-methods-use-this: 0 */
import Location from './Location';
import EventEmitter from './EventEmitter';

let singleton;
let guid = 0;

class LocationManager {
  constructor() {
    this.locations = [];
    this.registerLoadMapListener();
  }

  /**
   * Registers listener to global event that is generated when
   * Players are being imported from an existing map
   */
  registerLoadMapListener() {
    const emitter = EventEmitter.getInstance();
    emitter.on('onLocationsImported', (locations) => {
      locations.forEach((location) => {
        this.add(location);
      });
    });
  }

  /**
   * Adds a Location instance at the given coordinates
   * @param {object} config - { ?id: number, x: number, y: number, width: number, height: number }
   * @return {object} newly created Location instance
   */
  add(config) {
    const id = config.id || guid;
    const location = new Location(id);
    location.place(config);

    this.locations.push(location);
    guid += 1;
    return location;
  }

  /**
   * Deletes the given start location
   * @param {object} location - Location instance to delete
   */
  delete(location) {
    const idx = this.locations.indexOf(location);
    if (idx === -1) return;

    this.locations.splice(idx, 1);
    location.delete();
  }

  /**
   * Gracefully removes all the Locations and cleans up the array
   */
  reset() {
    while (this.locations.length) {
      const location = this.locations.pop();
      location.delete();
    }
  }

  /**
   * Makes all registered locations show up
   */
  showAll() {
    this.locations.forEach(location => location.show());
  }

  /**
   * Makes all registered locations hide
   */
  hideAll() {
    this.locations.forEach(location => location.hide());
  }

  /**
   * Unselects all registered locations
   */
  unselectAll() {
    this.locations.forEach(location => location.unselect());
  }

  /**
   * returns the start location instances
   * @return {object} list of StartLocation instances
   */
  getLocations() {
    return this.locations;
  }

  /**
   * Returns the currently selected Location instance
   * @return {object} Locations instance
   */
  getSelected() {
    for (let i = this.locations.length - 1; i >= 0; i -= 1) {
      if (this.locations[i].isSelected()) {
        return this.locations[i];
      }
    }
    return null;
  }
}

export default {
  getInstance() {
    if (!singleton) {
      singleton = new LocationManager();
    }
    return singleton;
  },
};
