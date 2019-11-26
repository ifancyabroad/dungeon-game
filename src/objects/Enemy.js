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
    this.setState(0);
    this.alive = true;
    this.health = 100;
    this.speed = 50;
  }

  update() {
    this.setSprite();
    if (this.state !== 2) {
      this.collisionCheck();
    }
    this.stateManager();
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

  // Check if in contact with player
  collisionCheck() {
    if (this.scene.physics.overlap(this, this.scene.player)) {
      this.setState(1);
    } else {
      this.setState(0);
    }
  }

  // Decide what to do
  stateManager() {
    switch (this.state) {
      case 0:
        this.findPlayer(this.scene.player);
        break;

      case 1:
        this.hit(this.scene.player);
        break;
    }
  }

  // Simple player tracking
  findPlayer(player) {
    this.scene.physics.moveToObject(this, player, this.speed);
  }

  // Hit the player
  hit(player) {
    this.body.stop();
    player.takeHit(this);
    // const attackEvent = this.scene.time.addEvent({
    //   delay: this.attackSpeed,
    //   callback: () => {
    //     if (this.state === 2) {
    //       player.takeHit();
    //     } else {
    //       attackEvent.remove();
    //     }
    //   },
    //   loop: true
    // });
  }

  // Temporarily stunned after being attacked
  stunned(player) {

    // Change state
    this.setState(2);
    this.scene.time.delayedCall(1000, () => {
      this.setState(0);
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

  // Take a hit from the player
  takeHit(player) {
    this.stunned(player);
    console.log('Monster: ouch!')
  }
}