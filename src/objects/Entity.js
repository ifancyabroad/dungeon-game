import { Physics } from "phaser";

export class Entity extends Physics.Arcade.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite)

    // Create the physics based sprite to move and animate
    // Double the size
    scene.physics.add.existing(this)
      .setScale(2)
      .setDepth(5);
  }


}