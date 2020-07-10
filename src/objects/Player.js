import { Entity } from "./Entity";

export class Player extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children, data) {
    super(scene, x, y, children, data);

    // Set physics body properties
    this.body
      .setOffset(0, 6);

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
    this.setData({
      score: data.score,
      gold: data.gold,
      lives: data.lives,
      maxLives: data.maxLives,
      speed: data.speed,
      size: data.size
    });

    // UI setup
    this.setHearts();
    this.setScore();
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

  // Add hearts display
  setHearts() {
    this.hearts = [];
    let x = 10;
    let y = 10;
    const maxHearts = this.getData('maxLives') / 2;
    const currentHearts = this.getData('lives') / 2;
    for (let i = 0; i < maxHearts; i++) {
      if (currentHearts >= i + 1) {
        this.hearts.push(this.scene.add.image(x, y, 'dungeon-sprites', 'frames/ui_heart_full.png'));
      } else if (i + 1 - currentHearts === 0.5) {
        this.hearts.push(this.scene.add.image(x, y, 'dungeon-sprites', 'frames/ui_heart_half.png'));
      } else {
        this.hearts.push(this.scene.add.image(x, y, 'dungeon-sprites', 'frames/ui_heart_empty.png'));
      }
      x += 16;
    }
  }

  // Update player hearts in the UI
  updateHearts() {
    const maxHearts = this.getData('maxLives') / 2;
    const currentHearts = this.getData('lives') / 2;
    for (let i = 0; i < maxHearts; i++) {
      if (currentHearts >= i + 1) {
        this.hearts[i].setTexture('dungeon-sprites', 'frames/ui_heart_full.png');
      } else if (i + 1 - currentHearts === 0.5) {
        this.hearts[i].setTexture('dungeon-sprites', 'frames/ui_heart_half.png');
      } else {
        this.hearts[i].setTexture('dungeon-sprites', 'frames/ui_heart_empty.png');
      }
    }
  }

  // Add score display
  setScore() {
    let x = this.scene.game.renderer.width - 5;
    let y = 10;
    this.scoreDisplay = this.scene.add.text(x, y, `Score: ${this.getData('score')}`, {
      fontFamily: '"Helvetica"',
      fontSize: '14px',
      fill: '#ddd',
      stroke: '#101319',
      strokeThickness: 4
    }).setOrigin(1, 0.5);
  }

  // Update score
  updateScore(points) {
    this.data.values.score += points;
    this.scoreDisplay.setText(`Score: ${this.getData('score')}`)
  }

  // Move player according to cursor keys
  controlManager() {

    // Attack if spacebar is pressed
    if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.weapon) {
      this.weapon.attack(this);
    }

    // Move left and right
    if (this.cursorKeys.left.isDown) {
      this.sprite.setFlipX(true);
      this.body.setVelocityX(-this.getData('speed'));
    } else if (this.cursorKeys.right.isDown) {
      this.sprite.setFlipX(false);
      this.body.setVelocityX(this.getData('speed'));
    } else {
      this.body.setVelocityX(0);
    }

    // Move up and down
    if (this.cursorKeys.up.isDown) {
      this.body.setVelocityY(-this.getData('speed'));
    } else if (this.cursorKeys.down.isDown) {
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

  // Take a hit from an enemy
  takeHit(enemy) {
    if (this.state !== 2) {
      this.stunned();
      this.flash();
      this.data.values.lives--;
      this.updateHearts();
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
  pickup(weapon) {
    if (this.weapon) {
      this.weapon.unequip(this);
    }
    this.add(weapon);
    this.sendToBack(weapon);
    this.weapon = weapon;
  }

  // Drop a weapon
  drop(weapon) {
    this.remove(weapon);
  }

  // Destroy game object and change scenes
  death() {
    this.setState(3);
    this.scene.scene.setActive(false);
    this.scene.mainScene.gameOver();
    this.destroy();
  }
}