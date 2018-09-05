/* global window, Phaser */
import { PLAYER_MANAGER_COLORS } from './consts';

const ns = window.fivenations;

/**
 * Implements a Phaser.Group that shows the player start location
 */
class StartLocation extends Phaser.Group {
  constructor(id) {
    super(ns.game.game);
    this.id = id;
    this.createSprite();
    this.hide();
  }

  /**
   * Creates the start location sprite
   */
  createSprite() {
    this.sprite = this.game.add.sprite(0, 0, 'map-startlocation');
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.75;
    this.sprite.scale.set(0.5);
    this.sprite.tint = PLAYER_MANAGER_COLORS[this.id - 1];
    this.add(this.sprite);
  }

  /**
   * Places the start location at the given coordinates
   * @param {object} coords - { x: number, y: number }
   */
  place(coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.show();
  }

  /**
   * Deletes start location
   */
  delete() {
    this.hide();
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
  getCoords() {
    return {
      x: this.sprite.x,
      y: this.sprite.y,
    };
  }
}

export default StartLocation;
