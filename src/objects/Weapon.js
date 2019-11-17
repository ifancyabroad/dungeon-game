export class Weapon {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    this.scene = scene;

    // Create the sprite to move and animate
    // Double the size
    this.sprite = scene.add
      .sprite(x, y, sprite)
      .setOrigin(0.5, 1)
      .setScale(2)
      .setDepth(4);

    // Set collision detection with the world
    // scene.physics.world.addCollider(this.sprite, scene.worldLayer);

    // Custom variables
    this.owned = true;
    this.inUse = false;
    this.hitBox = this.scene.add.rectangle(this.sprite.x, this.sprite.y, 42, 42);
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
    this.hitBox.x = player.flipX ? this.sprite.x - this.hitBox.width / 2 : this.sprite.x + this.hitBox.width / 2;
    this.hitBox.y = this.sprite.y - this.hitBox.height / 2;
  }

  // Move weapon with the player
  playerTracker(player) {
    this.sprite.x = player.flipX ? player.x - this.sprite.width : player.x + this.sprite.width;
    this.sprite.y = player.y + 4;
  }

  // Play attack animation
  attack(player, control) {
    if (Phaser.Input.Keyboard.JustDown(control) && !this.inUse) {
      this.inUse = true;
      this.scene.physics.world.enable(this.hitBox);
      this.scene.physics.overlap(this.hitBox, this.scene.enemySprites, this.hit, null, this)
      const angle = player.flipX ? -90 : 90;
      const tween = this.scene.add.tween({
        targets: this.sprite,
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

  hit() {
    console.log('A hit!');
  }
}