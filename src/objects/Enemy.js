import { Entity } from "./Entity";

export class Enemy extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    // Custom variables
    this.speed = 100;
  }

  update() {
    this.moveManager();
  }

  // Move player according to cursor keys
  moveManager() {
    const { cursorKeys, sprite, speed } = this;

    // Move left and right
    // if (cursorKeys.left.isDown) {
    //   sprite.setFlipX(true);
    //   sprite.setVelocityX(-speed);
    // } else if (cursorKeys.right.isDown) {
    //   sprite.setFlipX(false);
    //   sprite.setVelocityX(speed);
    // } else {
    //   sprite.setVelocityX(0);
    // }

    // Move up and down
    // if (cursorKeys.up.isDown) {
    //   sprite.setVelocityY(-speed);
    // } else if (cursorKeys.down.isDown) {
    //   sprite.setVelocityY(speed);
    // } else {
    //   sprite.setVelocityY(0);
    // }

    // If not moving play idle animation
    if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
      // sprite.play('knight_run', true);
    } else {
      sprite.play('skeleton_idle', true);
    }
  }
}