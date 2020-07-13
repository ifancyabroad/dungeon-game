export class Coin extends Phaser.Physics.Arcade.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite, frame) {
    super(scene, x, y, sprite, frame);

    this.scene = scene;

    // Create the sprite to move and animate
    this.scene.add
      .existing(this)
      .setDepth(4);

    // Set hitbox and collision
    this.scene.physics.world.enable(this);
    this.collider = this.scene.physics.world.addOverlap(this, this.scene.player, this.collect, null, this);

    this.play('coin');
  }

  update() {
  }

  // Coin picked up
  collect(coin, player) {
    this.scene.sound.play('coin', { volume: 0.3 });
    this.disableBody(true, true);
    player.updateGold(1);
  }
}