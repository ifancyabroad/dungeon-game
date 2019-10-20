export class Weapon extends Phaser.GameObjects.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(world, x, y, sprite) {
    super(world, x, y, sprite);

    // Add to the scene and enable physics
    world.add.existing(this);
    world.physics.world.enableBody(this);

    // Double the size
    this.setScale(2);

    this.owned = true;
  }

  update(player, attackKey) {
    if (this.owned) {
      this.followPlayer(player);
      this.attack(attackKey)
    }
  }

  // Move weapon with the player
  followPlayer(player) {
    this.x = player.flipX ? player.x - 8 : player.x + 8;
    this.y = player.y;
  }

  attack(control) {
    if (Phaser.Input.Keyboard.JustDown(control)) {
      // this.setAngle(90);
    //   const tween = this.tweens.add({
    //     targets: this.player,
    //     y: this.game.config.height - 64,
    //     ease: 'Power1',
    //     duration: 1500,
    //     repeat: 0,
    //     onComplete: function() {
    //       this.player.alpha = 1;
    //     },
    //     callbackScope: this
    //   })
    }
  }
}