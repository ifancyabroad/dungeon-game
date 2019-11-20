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
    this.owned = true;
    this.attacking = false;
  }

  update(player, attackKey) {
    if (this.owned) {
      this.position(player);
      this.attack(player, attackKey);
    }
  }

  // Position the weapon correctly based on player orientation
  position(player) {
    if (player.flipX) {
      this.setX(-4);
      this.body.setOffset(-16, 5);
    } else {
      this.setX(4);
      this.body.setOffset(8, 5);
    }
  }

  // Play attack animation
  attack(player, control) {
    if (Phaser.Input.Keyboard.JustDown(control) && !this.attacking) {

      // Set in use to stop multiple attacks at once
      this.attacking = true;

      // Set the collision
      this.scene.physics.overlap(this, this.scene.enemies, this.hit, null, this);

      // Start animation
      this.scene.add.tween({
        targets: this,
        angle: player.flipX ? -90 : 90,
        duration: 100,
        yoyo: true,
        onComplete() {
          this.attacking = false;
        },
        callbackScope: this
      });
    }
  }

  // Register a hit on the enemy!
  hit(player, enemy) {
    if (this.attacking) {
      console.log('A hit!', enemy);
      enemy.sprite.setTintFill();
      this.scene.time.delayedCall(200, () => {
        enemy.sprite.clearTint();
      }, null, this);
    }
  }
}