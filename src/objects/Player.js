import { Entity } from "./Entity";

export class Player extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    // Set player speed and allow interaction    
    this.sprite
      .setOrigin(0.5, 0.7)
      .setInteractive();

    // Custom variables
    this.speed = 100;

    // Weapon
    this.weapon = children[1];
    this.sendToBack(this.weapon);

    // Create movement keys
    this.cursorKeys = scene.input.keyboard.createCursorKeys();
    this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
  }

  update() {
    this.movePlayerManager();
    this.weapon.update(this.sprite, this.spacebar);
  }

  // Move player according to cursor keys
  movePlayerManager() {

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
}