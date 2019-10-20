import { Entity } from "./Entity";

export class Hero extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    // Set player speed
    this.speed = 100;
    this.setInteractive();
    this.setCollideWorldBounds(true);
  }

  update(keys) {
    this.movePlayerManager(keys);
  }

  // Move player according to cursor keys
  movePlayerManager(keys) {

    // Move left and right
    if (keys.left.isDown) {
      if (!this.flipX) { this.toggleFlipX(); }
      this.play('knight_run', true);
      this.setVelocityX(-this.speed);
    } else if (keys.right.isDown) {
      if (this.flipX) { this.toggleFlipX(); }
      this.play('knight_run', true);
      this.setVelocityX(this.speed);
    } else {
      this.setVelocityX(0);
    }

    // Move up and down
    if (keys.up.isDown) {
      this.play('knight_run', true);
      this.setVelocityY(-this.speed);
    } else if (keys.down.isDown) {
      this.play('knight_run', true);
      this.setVelocityY(this.speed);
    } else {
      this.setVelocityY(0);
    }

    // If not moving play idle animation
    if (!keys.left.isDown && !keys.right.isDown && !keys.up.isDown && !keys.down.isDown) {
      this.play('knight_idle', true);
    }
  }
}