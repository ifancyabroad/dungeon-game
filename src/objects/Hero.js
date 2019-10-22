import { Entity } from "./Entity";
import { Weapon } from "./Weapon";

export class Hero extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    // Set player speed and allow interaction    
    this.sprite
      .setOrigin(0.5, 0.7)
      .setInteractive();

    this.speed = 100;
    this.weapon = new Weapon(scene, this.sprite.x, this.sprite.y, 'sword')

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
    const { cursorKeys, sprite, speed } = this;

    // Move left and right
    if (cursorKeys.left.isDown) {
      sprite.setFlipX(true);
      sprite.setVelocityX(-speed);
    } else if (cursorKeys.right.isDown) {
      sprite.setFlipX(false);
      sprite.setVelocityX(speed);
    } else {
      sprite.setVelocityX(0);
    }

    // Move up and down
    if (cursorKeys.up.isDown) {
      sprite.setVelocityY(-speed);
    } else if (cursorKeys.down.isDown) {
      sprite.setVelocityY(speed);
    } else {
      sprite.setVelocityY(0);
    }

    // If not moving play idle animation
    if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
      sprite.play('knight_run', true);
    } else {
      sprite.play('knight_idle', true);
    }
  }
}