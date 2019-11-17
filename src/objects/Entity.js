export class Entity extends Phaser.Physics.Arcade.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    this.scene = scene

    // Create the physics based sprite to move and animate
    this.scene.add
      .existing(this);

    this.scene.physics.add
      .existing(this)
      .setScale(2)
      .setDepth(5);
  }


}