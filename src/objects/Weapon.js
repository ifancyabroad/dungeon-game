export class Weapon extends Phaser.GameObjects.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    this.scene = scene;

    // Create the sprite to move and animate
    this.scene.add
      .existing(this)
      .setOrigin(0.5, 1);

    // Set collision detection with the world
    // scene.physics.world.addCollider(this.sprite, scene.worldLayer);

    // Custom variables
    this.owned = true;
    this.inUse = false;

    // Hitbox
    this.hitBox = this.scene.add.rectangle(this.x, this.y, 42, 42);
    this.scene.physics.world.enable(this.hitBox);
  }

  update(player, attackKey) {
    if (this.owned) {
      this.tracker(player);
      this.attack(player, attackKey);
    }
  }

  // Move weapon with the player
  tracker(player) {
    // Hitbox tracker
    this.hitBox.x = player.flipX ? this.x - this.hitBox.width / 2 : this.x + this.hitBox.width / 2;
    this.hitBox.y = this.y - this.hitBox.height / 2;
  }

  // Play attack animation
  attack(player, control) {
    if (Phaser.Input.Keyboard.JustDown(control) && !this.inUse) {

      // Set in use to stop multiple attacks at once
      this.inUse = true;

      // Set location of the hitbox
      // const x = player.flipX ? this.sprite.x - this.hitBox.width / 2 : this.sprite.x + this.hitBox.width / 2;
      // const y = this.sprite.y - this.hitBox.height / 2;  
      // this.hitBox.setPosition(x, y);

      // Check if hit
      this.scene.physics.overlap(this.hitBox, this.scene.enemies, this.hit, null, this);

      // Start animation
      this.scene.add.tween({
        targets: this,
        angle: player.flipX ? -90 : 90,
        duration: 100,
        yoyo: true,
        onComplete() {
          this.inUse = false;
        },
        callbackScope: this
      });
    }
  }

  // Register a hit on the enemy!
  hit(player, enemy) {
    console.log('A hit!', enemy);
    enemy.setTintFill();
    this.scene.time.delayedCall(200, () => {
      enemy.clearTint();
    }, null, this);
  }
}