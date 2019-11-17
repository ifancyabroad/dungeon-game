import { Entity } from "./Entity";

export class Enemy extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    // Custom variables
    this.speed = 100;
  }

  update() {
    this.moveEnemyManager();
  }

  // Move player according to cursor keys
  moveEnemyManager() {

    // If not moving play idle animation
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      // this.play('knight_run', true);
    } else {
      console.log(this);
      this.play('skeleton_idle', true);
    }
  }
}