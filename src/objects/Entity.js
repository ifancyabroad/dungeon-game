export class Entity extends Phaser.GameObjects.Container {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    this.scene = scene

    // Set the character sprite
    this.sprite = children[0];

    // Add container to the scene and set scale and depth
    this.scene.add
      .existing(this)
      .setScale(2)
      .setDepth(5);
  
    // Add physics to the container
    this.scene.physics.world.enable(this);
  }
}