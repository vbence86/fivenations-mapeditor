import EventEmitter from './EventEmitter';
import { EVENT_ON_SELECTOR_RESET } from './consts';

let singleton;

/**
 * It holds the required informations about currently selected object
 */

class Selector {
  /**
   * Persists the given selection informations
   * @param {object} - selection details { id, category }
   */
  select({ id, category }) {
    this.id = id;
    this.category = category;
  }

  /**
   * @param {number} index of the player to be selected
   */
  selectPlayer(idx) {
    this.selectedPlayerIdx = idx || 1;
  }

  /**
   * Resets the current selection
   */
  reset() {
    this.id = null;
    EventEmitter.getInstance().emit(EVENT_ON_SELECTOR_RESET);
  }

  /**
   * Returns the unique id of selected object
   * @return {number}
   */
  getId() {
    return this.id;
  }

  /**
   * Returns the selected category
   * @return {number}
   */
  getCategory() {
    return this.category;
  }

  /**
   * Returns the selected player's index
   * @return {number}
   */
  getSelectedPlayer() {
    return this.selectedPlayerIdx;
  }

  /**
   * Returns whether the selection is active
   * @return {boolean}
   */
  isActive() {
    return !!this.id;
  }
}

/**
 * Singleton pattern around the main class to make it useble across
 * the whole application
 */
export default {
  getInstance() {
    if (!singleton) {
      singleton = new Selector();
    }
    return singleton;
  },
};
