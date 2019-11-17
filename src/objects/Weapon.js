import { Physics } from "phaser";

export class Weapon extends Physics.Arcade.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite)

    // Create the sprite to move and animate
    // Double the size
    scene.physics.add.existing(this)
      .setOrigin(0.5, 1)
      .setScale(2)
      .setDepth(4);

    // Set collision detection with the world
    // scene.physics.world.addCollider(this.sprite, scene.worldLayer);

    // Custom variables
    this.owned = true;
    this.inUse = false;
    this.hitBox = this.scene.add.rectangle(this.x, this.y, 42, 42);
  }

  update(player, attackKey) {
    if (this.owned) {
      this.hitBoxTracker(player);
      this.playerTracker(player);
      this.attack(player, attackKey);
    }
  }

  // Hitbox to follow the weapon sprite
  hitBoxTracker(player) {
    this.hitBox.x = player.flipX ? this.x - this.hitBox.width / 2 : this.x + this.hitBox.width / 2;
    this.hitBox.y = this.y - this.hitBox.height / 2;
  }

  // Move weapon with the player
  playerTracker(player) {
    this.x = player.flipX ? player.x - this.width : player.x + this.width;
    this.y = player.y + 4;
  }

  // Play attack animation
  attack(player, control) {
    if (Phaser.Input.Keyboard.JustDown(control) && !this.inUse) {
      this.inUse = true;
      this.scene.physics.world.enable(this.hitBox);
      const angle = player.flipX ? -90 : 90;
      const tween = this.scene.add.tween({
        targets: this,
        angle: angle,
        duration: 100,
        yoyo: true,
        onComplete() {
          this.inUse = false;
          this.scene.physics.world.disable(this.hitBox);
        },
        callbackScope: this
      });
    }
  }
}