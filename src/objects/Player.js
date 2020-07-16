import { Entity } from "./Entity";

export class Player extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children, data) {
    super(scene, x, y, children, data);

    // Set physics body properties
    this.body.setOffset(0, 6);

    // Create movement keys
    this.pointer = scene.input.activePointer;
    this.controls = scene.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D,
      'attack': Phaser.Input.Keyboard.KeyCodes.SPACE
    })

    // States
    /*  0: Default state 
    *   1: 
    *   2: Stunned state
    *   3: Death state
    */  
    this.setState(0);

    // Custom variables
    this.setData({
      score: data.score,
      gold: data.gold,
      lives: data.lives,
      maxLives: data.maxLives,
      speed: data.speed,
      size: data.size,
      weapon: data.weapon
    });
  }

  update() {
    this.controlManager();
    this.aliveCheck();
  }

  isAlive = () => this.getData('lives') > 0;

  // Check if alive
  aliveCheck() {
    if (!this.isAlive()) {
      this.death();
    }
  }

  // Update score
  updateScore(points) {
    this.data.values.score += points;
    this.scene.events.emit('updateScore');
  }

  // Update gold
  updateGold(gold) {
    this.data.values.gold += gold;
    this.scene.events.emit('updateGold');
  }

  // Move player according to cursor keys
  controlManager() {

    // Face the pointer
    if (this.x > this.pointer.x) {
      this.sprite.setFlipX(true);
    } else {
      this.sprite.setFlipX(false);
    }

    // Attack if spacebar is pressed
    if ((Phaser.Input.Keyboard.JustDown(this.controls.attack) || this.pointer.isDown) && this.weapon) {
      this.weapon.attack(this);
    }

    // Move left and right
    if (this.controls.left.isDown) {
      this.body.setVelocityX(-this.getData('speed'));
    } else if (this.controls.right.isDown) {
      this.body.setVelocityX(this.getData('speed'));
    } else {
      this.body.setVelocityX(0);
    }

    // Move up and down
    if (this.controls.up.isDown) {
      this.body.setVelocityY(-this.getData('speed'));
    } else if (this.controls.down.isDown) {
      this.body.setVelocityY(this.getData('speed'));
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
    enemy.takeHit(weapon, this);
  }

  // Take a hit
  takeHit(enemy) {
    if (this.state !== 2) {
      this.stunned();
      this.flash();
      this.data.values.lives--;
      this.scene.events.emit('updateHearts');
    }
  }

  // Temporary invincibility after being hit
  stunned() {
    this.setState(2);
    this.scene.time.delayedCall(1000, () => {
      this.setState(0);
    }, null, this);    
  }

  // Flash red
  flash() {
    this.sprite.setTintFill(0xff0000);
    this.scene.time.delayedCall(200, () => {
      this.sprite.clearTint();
    }, null, this);
  }

  // Pickup a weapon
  equip(weapon, player) {
    if (this.weapon) {
      this.remove(this.weapon);
      this.weapon.setUnequipped(this);
    }
    this.weapon = weapon;
    this.setData('weapon', this.weapon.name)
    this.add(this.weapon);
  }

  // Destroy game object and change scenes
  death() {
    this.setState(3);
    this.setActive(false);
    this.scene.scene.setActive(false);
    this.scene.mainScene.gameOver();
  }
}