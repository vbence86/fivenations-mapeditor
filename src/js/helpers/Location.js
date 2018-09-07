/* global window, Phaser */

const ns = window.fivenations;
const ALPHA_SELECTED = 0.5;
const ALPHA_DEFAULT = 0.25;

/**
 * Implements a Phaser.Group that shows the player start location
 */
class Location extends Phaser.Group {
  constructor(id) {
    super(ns.game.game);
    this.id = id;
    this.hide();
  }

  /**
   * Places the start location at the given coordinates
   * @param {object} coords - { x: number, y: number }
   */
  place(coords) {
    this.setCoords(coords);
    this.addSprite();
    this.addLabel();
    this.show();
  }

  /**
   * Creates a semi-transparent layer that represents the area of the
   * placed location
   */
  addSprite() {
    this.bmd = this.game.add.bitmapData(this.coords.width, this.coords.height);
    this.bmd.context.fillStyle = '#80CAF9';
    this.bmd.context.fillRect(0, 0, this.coords.width, this.coords.height);

    this.sprite = this.bmd.addToWorld(this.coords.x, this.coords.y);
    this.sprite.alpha = ALPHA_DEFAULT;
    this.add(this.sprite);
  }

  /**
   * Adds a label which shows the ID of the location to the top left corner
   */
  addLabel() {
    const title = `Location #${this.id}`;
    this.label = this.game.add.text(
      this.coords.x + 3,
      this.coords.y + 3,
      title,
      {
        font: '11px BerlinSansFB-Reg',
        fill: '#77C7D2',
      },
    );
    this.label.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.add(this.label);
  }

  /**
   * Selects the location
   */
  select() {
    this.selected = true;
    this.sprite.alpha = ALPHA_SELECTED;
  }

  /**
   * Unselects the location
   */
  unselect() {
    this.selected = false;
    this.sprite.alpha = ALPHA_DEFAULT;
  }

  /**
   * Deletes start location
   */
  delete() {
    this.remove(this.sprite);
    this.sprite.destroy();
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
   * Sets the coordinates and dimension of the location
   * @param {object} coords
   */
  setCoords(coords) {
    this.coords = {
      x: coords.x,
      y: coords.y,
      width: coords.width,
      height: coords.height,
    };
  }

  /**
   * Returns the target coordinates of the placement
   * @return {object} { x: number, y: number }
   */
  getCoords() {
    return this.coords;
  }

  /**
   * Returns true if the location is selected
   * @return {boolean}
   */
  isSelected() {
    return this.selected;
  }

  /**
   * Returns the ID attribute of the Location
   * @return {number} this.id
   */
  getId() {
    return this.id;
  }
}

export default Location;
