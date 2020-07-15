export class Entity extends Phaser.GameObjects.Container {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children, data) {
    super(scene, x, y, children);

    this.scene = scene

    // Set the character sprite
    this.sprite = children[0];

    // Add container to the scene and set size and depth
    this.scene.add
      .existing(this)
      .setSize(data.size.width, data.size.height)
      .setDepth(5);
  
    // Add physics to the container
    this.scene.physics.add
      .existing(this)

    // Create and add shadow
    const shadow = this.scene.add.ellipse(0, this.sprite.height / 2, this.sprite.width - 4, 3, 0x111111, 0.8);
    this.add(shadow);
    this.sendToBack(shadow);
  }
}