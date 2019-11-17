import { Entity } from "./Entity";
import { Weapon } from "./Weapon";

export class Hero extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    // Set player speed and allow interaction    
    this
      .setOrigin(0.5, 0.7)
      .setInteractive();

    // Custom variables
    this.speed = 100;
    this.weapon = new Weapon(scene, this.x, this.y, 'sword');

    // Create movement keys
    this.cursorKeys = scene.input.keyboard.createCursorKeys();
    this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
  }

  update() {
    this.movePlayerManager();
    this.weapon.update(this, this.spacebar);
  }

  // Move player according to cursor keys
  movePlayerManager() {
    console.log(this)

    // Move left and right
    if (this.cursorKeys.left.isDown) {
      this.setFlipX(true);
      this.setVelocityX(-this.speed);
    } else if (this.cursorKeys.right.isDown) {
      this.setFlipX(false);
      this.setVelocityX(this.speed);
    } else {
      this.setVelocityX(0);
    }

    // Move up and down
    if (this.cursorKeys.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (this.cursorKeys.down.isDown) {
      this.setVelocityY(this.speed);
    } else {
      this.setVelocityY(0);
    }

    // If not moving play idle animation
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      this.play('knight_run', true);
    } else {
      this.play('knight_idle', true);
    }
  }
}