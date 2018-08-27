/* global window, Phaser */
import EventEmitter from './EventEmitter';
import { EVENT_ON_SELECTOR_SELECT, EVENT_ON_SELECTOR_RESET } from './consts';

let singleton;

const ns = window.fivenations;

/**
 * Returns the id of the frame that should be displayed when the
 * BuildingPlacementDisplay is activated
 * @param {string} id - id of the entity
 * the BuildingPlacementDisplay has been activated
 * @return {number} the frame of the entity that should be displayed
 */
function getDisplayFrame(id) {
  const data = ns.game.cache.getJSON(id);
  if (data.frames && data.frames.length) return data.frames[0];
  if (data.customFrame !== undefined) return data.customFrame;
  if (data.animations && data.animations['idle-forever']) {
    if (data.animations['idle-forever'].frames.length === 1) {
      return data.animations['idle-forever'].frames[0];
    }
  }
  return 3;
}

/**
 * Implements a Phaser.Group that shows the currently selected
 * space object/entity/effect at the pointer
 */
class SelectorDisplay extends Phaser.Group {
  constructor() {
    super(ns.game.game);
    this.registerSelectorListeners();
  }

  /**
   * Registers listeners
   * @param {object} - selection details { id, category }
   */
  registerSelectorListeners() {
    const emitter = EventEmitter.getInstance();
    emitter.on(EVENT_ON_SELECTOR_SELECT, this.activate.bind(this));
    emitter.on(EVENT_ON_SELECTOR_RESET, this.deactivate.bind(this));
  }

  /**
   * Activates the display by the given Entity id
   * @param {object} selection - { id: string, category: string }
   */
  activate(selection) {
    const { id } = selection;
    if (!id) return;

    if (this.sprite) {
      this.removeSprite();
      this.removeEventListeners();
    }

    // if BDP is activated we don't need the SelectorDisplay
    if (!ns.BPDActivated) {
      this.createSpriteById(id);
      this.addEventListeners();
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Creates a sprite to be displayed on mouse move at the pointer
   * to display where the entity (building) will be constructed
   * @param {string} id - Id of the entity to be shown
   */
  createSpriteById(id) {
    const DO = ns.game.cache.getJSON(id);
    const spriteId = DO.sprite || id;
    this.sprite = this.game.add.sprite(0, 0, spriteId);
    this.sprite.frame = getDisplayFrame(id);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.75;
    this.add(this.sprite);
  }

  /**
   * Registers event listeners against the UserPointer instance
   */
  addEventListeners() {
    const pointer = ns.game.userPointer;
    this.onMoveCallback = this.followMouse.bind(this);
    pointer.on('move', this.onMoveCallback);
  }

  /**
   * Callback that is invoked on every mouse move
   * @param {object} pointer - UserPointer instance
   */
  followMouse(pointer) {
    const { x, y } = pointer.getRealCoords();

    this.sprite.x = x;
    this.sprite.y = y;
  }

  /**
   * Deactivates the display removing the corresponding elements
   */
  deactivate() {
    this.removeSprite();
    this.removeEventListeners();
    this.hide();
  }

  /**
   * Removes the sprite that represents the currently selected
   * entity from the group
   */
  removeSprite() {
    if (!this.sprite) return;
    this.remove(this.sprite);
    this.sprite.destroy();
  }

  /**
   * Detaches event listeners against the UserPointer instance
   */
  removeEventListeners() {
    const pointer = ns.game.userPointer;
    if (this.onMoveCallback) {
      pointer.remove('move', this.onMoveCallback);
      this.onMoveCallback = undefined;
    }
  }

  /**
   * Makes the placement display visible
   */
  show() {
    this.visible = true;
  }

  /**
   * Makes the placement display hidden
   */
  hide() {
    this.visible = false;
  }

  /**
   * Returns the target coordinates of the placement
   * @return {object} { x: number, y: number }
   */
  getPlacementCoords() {
    return {
      x: this.sprite.x,
      y: this.sprite.y,
    };
  }
}

/**
 * Singleton pattern around the main class to make it useble across
 * the whole application
 */
export default {
  addToWorld() {
    if (!singleton) {
      singleton = new SelectorDisplay();
    }
    return singleton;
  },
};
