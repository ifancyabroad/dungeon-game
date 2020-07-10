export class Spikes extends Phaser.Physics.Arcade.Sprite {

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
    this.collider = this.scene.physics.world.addOverlap(this, this.scene.player, this.hitPlayer, null, this);

    this.body
      .setSize(16, 16)
      .setOffset(0)

    this.play('floor_spikes');
  }

  update() {
  }

  // Damage player
  hitPlayer(spikes, player) {
    player.takeHit();
  }
}