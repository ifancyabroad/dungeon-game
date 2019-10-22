export class Weapon {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    this.scene = scene;

    // Create the physics based sprite to move and animate
    // Double the size
    // Stop any rotation
    this.sprite = scene.physics.add
      .sprite(x, y, sprite)
      .setOrigin(0.5, 1)
      // .setCollisionCategory(0)
      .setScale(2)
      .setDepth(4)

    this.owned = true;
  }

  update(player, attackKey) {
    if (this.owned) {
      this.followPlayer(player);
      this.attack(player, attackKey)
    }
  }

  // Move weapon with the player
  followPlayer(player) {
    this.sprite.x = player.flipX ? player.x - 8 : player.x + 8;
    this.sprite.y = player.y + 4;
  }

  attack(player, control) {
    if (Phaser.Input.Keyboard.JustDown(control)) {
      const angle = player.flipX ? -90 : 90;
      const tween = this.scene.add.tween({
        targets: this.sprite,
        angle: angle,
        duration: 100,
        yoyo: true
      });
    }
  }
}