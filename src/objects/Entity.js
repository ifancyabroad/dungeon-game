import { Physics } from "phaser";

export class Entity extends Physics.Arcade.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    // Add to the scene and enable physics
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    // Double the size
    this.setScale(2);
  }


}