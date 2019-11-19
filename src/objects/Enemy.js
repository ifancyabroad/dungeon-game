import { Entity } from "./Entity";

export class Enemy extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    // Custom variables
    this.speed = 100;
  }

  update() {
    this.moveManager();
  }

  // Move player according to cursor keys
  moveManager() {

    // If not moving play idle animation
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      this.sprite.play('skelet_run', true);
    } else {
      this.sprite.play('skeleton_idle', true);
    }
  }
}