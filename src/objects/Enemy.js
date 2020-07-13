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
      value: data.value,
      health: data.stats.health,
      maxHealth: data.stats.health,
      speed: data.stats.speed,
      sprite: data.sprite
    });
  }

  update() {
    if (this.state !== 2) {
      this.setSprite();
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
      this.sprite.play(`${this.data.values.sprite}_run`, true);
    } else {
      this.sprite.play(`${this.data.values.sprite}_idle`, true);
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
    player.takeHit(this);
  }

  // Take a hit from the player
  takeHit(weapon, player) {
    this.stunned();
    this.flash();
    this.knockback(weapon.getData('knockback'), player);
    this.data.values.health -= weapon.getData('damage');
  }

  // Temporarily stunned after being attacked
  stunned() {
    this.setState(2);
    this.scene.time.delayedCall(1000, () => {
      this.setState(0);
    }, null, this);        
  }

  // Flash white
  flash() {
    this.sprite.setTintFill();
    this.scene.time.delayedCall(200, () => {
      this.sprite.clearTint();
    }, null, this);
  }

  // Knockback effect
  knockback(force, player) {
    const x = this.body.x - player.body.x;
    const y = this.body.y - player.body.y;
    this.body.velocity.x += x * force;
    this.body.velocity.y += y * force;
  }

  // Destroy game object and show death explosion
  death() {
    this.scene.player.updateScore(this.getData('value'));
    this.setState(3);
    this.emitter.emitParticleAt(this.x, this.y);
    this.destroy();
  }
}