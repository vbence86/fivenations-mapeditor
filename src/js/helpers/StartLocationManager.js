/* eslint class-methods-use-this: 0 */
import { PLAYERS_COUNT } from './consts';
import StartLocation from './StartLocation';
import EventEmitter from './EventEmitter';

let singleton;

class StartLocationManager {
  constructor() {
    this.createStartLocations();
    this.registerLoadMapListener();
  }

  /**
   * Creates all the StartLocation instances
   */
  createStartLocations() {
    this.locations = {};
    for (let i = PLAYERS_COUNT; i >= 1; i -= 1) {
      this.locations[i] = new StartLocation(i);
    }
  }

  /**
   * Registers listener to global event that is generated when
   * Players are being imported from an existing map
   */
  registerLoadMapListener() {
    const emitter = EventEmitter.getInstance();
    emitter.on('onPlayersImported', (players) => {
      for (let i = PLAYERS_COUNT; i >= 1; i -= 1) {
        if (players[i] && players[i].startLocation) {
          this.place(i, players[i].startLocation);
        } else {
          this.delete(i);
        }
      }
    });
  }

  /**
   * Places the given start location at the given coordinates
   * @param {id} number - id of the player to whom the start location belongs
   * @param {coords} object - { x: number, y: number }
   */
  place(id, coords) {
    this.locations[id].place(coords);
  }

  /**
   * Deletes the given start location
   * @param {id} number - id of the player to whom the start location belongs
   */
  delete(id) {
    this.locations[id].delete();
  }

  /**
   * Resets all the start locations
   */
  reset() {
    Object.keys(this.locations).forEach(key => this.locations[key].delete());
  }

  /**
   * returns the start location instances
   * @return {object} list of StartLocation instances
   */
  getLocations() {
    return this.locations;
  }
}

export default {
  getInstance() {
    if (!singleton) {
      singleton = new StartLocationManager();
    }
    return singleton;
  },
};
