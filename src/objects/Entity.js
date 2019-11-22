export class Entity extends Phaser.GameObjects.Container {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    this.scene = scene

    // Set the character sprite
    this.sprite = children[0];

    // Add container to the scene and set size and depth
    this.scene.add
      .existing(this)
      .setSize(this.sprite.width, this.sprite.height)
      .setDepth(5)
      .setInteractive();
  
    // Add physics to the container
    this.scene.physics.add
      .existing(this);
  }
}