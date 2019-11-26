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

    // Custom variables
    this.setState(0);
    this.alive = true;
    this.speed = 100;
  }

  update() {
    this.controlManager();
    this.weapon.update(this);
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
    enemy.takeHit(this);
  }

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

  // Take a hit from an enemy
  takeHit(enemy) {
    if (this.state !== 2) {
      this.stunned();
      console.log('Player: ouch!');
    }
  }
}