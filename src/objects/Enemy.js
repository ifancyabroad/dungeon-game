import { Entity } from "./Entity";

export class Enemy extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    // Set physics body properties
    this.body
      .setDrag(50)
      .setBounce(0.5);

    // Custom variables
    this.speed = 50;
    this.attackSpeed = 1000;
    this.state = 1;
  }

  update() {
    this.setSprite();
    this.aiManager();
  }

  // Set sprite direction and animations
  setSprite() {

    // Flip sprite if moving in a direction
    if (this.body.velocity.x > 0) {
      this.sprite.setFlipX(false);
    } else if (this.body.velocity.x < 0) {
      this.sprite.setFlipX(true);
    }

    // If not moving play idle animation
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      this.sprite.play('skelet_run', true);
    } else {
      this.sprite.play('skeleton_idle', true);
    }
  }

  // Decide what to do
  aiManager() {
    if (this.scene.physics.overlap(this, this.scene.player)) {
      this.attack(this.scene.player);
    } else {
      this.findPlayer(this.scene.player);
    }
  }

  // Simple player tracking
  findPlayer(player) {
    if (this.state !== 3) {
      this.state = 1;
      this.scene.physics.moveToObject(this, player, this.speed);
    }
  }

  // Attacking the player
  attack(player) {
    if (this.state !== 2) {
      this.state = 2;
      this.body.stop();
      const attackEvent = this.scene.time.addEvent({
        delay: this.attackSpeed,
        callback: () => {
          if (this.state === 2) {
            player.takeHit();
          } else {
            attackEvent.remove();
          }
        },
        loop: true
      })
    }
  }

  // Take a hit from the player
  takeHit(player) {

    // Change state
    this.state = 3;
    this.scene.time.delayedCall(1000, () => {
      this.state = 1;
    }, null, this);

    // Flash white
    this.sprite.setTintFill();
    this.scene.time.delayedCall(200, () => {
      this.sprite.clearTint();
    }, null, this);

    // Knockback effect
    const x = this.body.x - player.body.x;
    const y = this.body.y - player.body.y;
    this.body.velocity.x += x * 5;
    this.body.velocity.y += y * 5;
  }
}