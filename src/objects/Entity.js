import { Physics } from "phaser";

export class Entity extends Phaser.Physics.Matter.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene.matter.world, x, y, sprite);
    scene.matter.add.scene.add.existing(this);

    // Double the size and stop rotation
    this.setScale(2);
    this.setFixedRotation();
  }


}