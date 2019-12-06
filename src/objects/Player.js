import { Entity } from "./Entity";

export class Player extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    // Weapon
    this.weapon = children[1];
    this.sendToBack(this.weapon);

    // Create movement keys
    this.cursorKeys = scene.input.keyboard.createCursorKeys();
    this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // States
    /*  0: Default state 
    *   1: 
    *   2: Stunned state
    *   3: Death state
    */  
    this.setState(0);

    // Custom variables
    this.lives = 6;
    this.speed = 100;
  }

  isAlive = () => this.lives > 0;

  update() {
    this.controlManager();
    this.weapon.update(this);
    this.livesCheck();
  }

  // Check the players lives
  livesCheck() {
    if (!this.isAlive()) {
      this.death();
    }
  }

  // Move player according to cursor keys
  controlManager() {

    // Attack if spacebar is pressed
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.weapon.attack(this);
    }

    // Move left and right
    if (this.cursorKeys.left.isDown) {
      this.sprite.setFlipX(true);
      this.body.setVelocityX(-this.speed);
    } else if (this.cursorKeys.right.isDown) {
      this.sprite.setFlipX(false);
      this.body.setVelocityX(this.speed);
    } else {
      this.body.setVelocityX(0);
    }

    // Move up and down
    if (this.cursorKeys.up.isDown) {
      this.body.setVelocityY(-this.speed);
    } else if (this.cursorKeys.down.isDown) {
      this.body.setVelocityY(this.speed);
    } else {
      this.body.setVelocityY(0);
    }

    // If not moving play idle animation
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      this.sprite.play('knight_run', true);
    } else {
      this.sprite.play('knight_idle', true);
    }
  }

  // Register a hit on the enemy!
  hit(weapon, enemy) {
    enemy.takeHit(weapon.damage, this);
  }

  // Temporary invincibility after being hit
  stunned() {

    // Change state
    this.setState(2);
    this.scene.time.delayedCall(1000, () => {
      this.setState(0);
    }, null, this);

    // Flash red
    this.sprite.setTintFill(0xff0000);
    this.scene.time.delayedCall(200, () => {
      this.sprite.clearTint();
    }, null, this);
  }

  // Destroy game object and change scenes
  death() {
    this.setState(3);
    this.scene.gameOver();
    this.destroy();
  }

  // Take a hit from an enemy
  takeHit(enemy) {
    if (this.state !== 2) {
      this.stunned();
      this.lives--;
    }
  }
}