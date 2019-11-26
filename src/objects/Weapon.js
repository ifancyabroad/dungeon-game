export class Weapon extends Phaser.GameObjects.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    this.scene = scene;

    // Create the sprite to move and animate
    this.scene.add
      .existing(this)
      .setY(4)
      .setOrigin(0.5, 1);

    // Set hitbox
    this.scene.physics.world.enable(this);
    this.body
      .setSize(16, 16);

    // Custom variables
    this.setState(1);
  }

  update(player) {
    if (this.state !== 0) {
      this.setSprite(player.sprite);
    }
  }

  // Position the weapon correctly based on player orientation
  setSprite(player) {
    if (player.flipX) {
      this.setX(-4);
      this.body.setOffset(-16, 5);
    } else {
      this.setX(4);
      this.body.setOffset(8, 5);
    }
  }

  // Play attack animation
  attack(player) {
    if (this.state !== 2) {

      // Set in use to stop multiple attacks at once
      this.setState(2);

      // Set the collision
      this.scene.physics.overlap(this, this.scene.enemies, player.hit, null, player);

      // Start animation
      this.scene.add.tween({
        targets: this,
        angle: player.sprite.flipX ? -90 : 90,
        duration: 100,
        yoyo: true,
        onComplete() {
          this.setState(1);;
        },
        callbackScope: this
      });
    }
  }
}