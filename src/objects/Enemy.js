import { Entity } from "./Entity";

export class Enemy extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children, data) {
    super(scene, x, y, children, data);

    // Set physics body properties
    this.body
      .setDrag(50)
      .setBounce(0.5);

    // Particle emitter for death animation
    this.emitter = this.scene.particles.createEmitter({
      frame: ['frames/skull.png'],
      angle: { min: 240, max: 300 },
      speed: { min: 40, max: 60 },
      quantity: { min: 2, max: 10 },
      lifespan: 1200,
      alpha: { start: 1, end: 0 },
      scale: { min: 0.05, max: 0.4 },
      rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
      gravityY: 80,
      on: false
    });

    // States
    /*  0: Find and chase player
    *   1: Attack player
    *   2: Stunned state
    *   3: Death state
    */  
    this.setState(0);

    // Custom variables
    this.setData({
      health: data.stats.health,
      maxHealth: data.stats.health,
      speed: data.stats.speed
    });
  }

  update() {
    this.setSprite();
    if (this.state !== 2) {
      this.collisionCheck();
    }
    this.stateManager();
    this.aliveCheck();
  }

  isAlive = () => this.getData('health') > 0;

  // Check if alive
  aliveCheck() {
    if (!this.isAlive()) {
      this.death();
    }
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
    if (this.scene.physics.collide(this, this.scene.player)) {
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
        this.attackPlayer(this.scene.player);
        break;
    }
  }

  // Simple player tracking
  findPlayer(player) {
    this.body.moves = true;
    this.scene.physics.moveToObject(this, player, this.getData('speed'));
  }

  // Attack the player
  attackPlayer(player) {
    this.body.moves = false;
    // this.body.stop();
    player.takeHit(this);
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

  // Destroy game object and show death explosion
  death() {
    this.setState(3);
    this.emitter.emitParticleAt(this.x, this.y);
    this.destroy();
  }

  // Take a hit from the player
  takeHit(damage, player) {
    this.stunned(player);
    this.data.values.health -= damage;
  }
}