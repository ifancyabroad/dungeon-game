export class Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    this.scene = scene

    // Create the physics based sprite to move and animate
    // Double the size
    this.sprite = scene.physics.add
      .sprite(x, y, sprite)
      .setScale(2)
      .setDepth(5);
  }


}