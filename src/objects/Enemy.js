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
    this.speed = 100;
  }

  update() {
    this.moveManager();
  }

  moveManager() {
    // If not moving play idle animation
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      this.sprite.play('skelet_run', true);
    } else {
      this.sprite.play('skeleton_idle', true);
    }
  }

  takeHit(player) {
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