export class Menu extends Phaser.Scene {

  constructor() {
    super('menu');
  }

  create() {
    this.music = this.sound.add('menuMusic');
    this.music.play({
      loop: true,
      volume: 0.1
    });

    this.add.image(0, 0, 'caves')
      .setScale(0.5)
      .setOrigin(0, 0)
      .setDepth(0);

    const logo = this.add.image(this.game.renderer.width / 2, 80, 'logo')
      .setScale(0.6);
    this.tweens.add({
      targets: logo ,
      scale: 0.55,
      ease: 'Linear',
      duration: 1000,
      yoyo: true,
      repeat: -1
    });

    this.options = this.add.group([
      this.add.text(this.game.renderer.width / 2, 160, 'Start', {
        fontFamily: '"ThaleahFat"',
        fontSize: '20px',
        fill: '#ddd',
        stroke: '#000',
        strokeThickness: 4
      }).setOrigin(0.5),
      this.add.text(this.game.renderer.width / 2, 190, 'Controls', {
        fontFamily: '"ThaleahFat"',
        fontSize: '20px',
        fill: '#ddd',
        stroke: '#000',
        strokeThickness: 4
      }).setOrigin(0.5)
    ]);

    this.currentIndex = 0;
    const option = this.options.getChildren()[this.currentIndex];
    this.cursor = this.add.container(option.x, option.y, [
      this.add.sprite(-(option.width / 2 + 24), 4, 'dungeon-sprites', 'frames/weapon_spear.png').setAngle(90),
      this.add.sprite(option.width / 2 + 24, 4, 'dungeon-sprites', 'frames/weapon_spear.png').setAngle(270)
    ]);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER
    });
  }

  update() {
    // Menu up
    if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
      this.navigateMenu(-1);
    }
    
    // Menu down
    if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
      this.navigateMenu(1);
    }

    // Select
    if (Phaser.Input.Keyboard.JustDown(this.keys.space) ||
      Phaser.Input.Keyboard.JustDown(this.keys.enter)) {
      this.sound.play('menuSelect');

      switch (this.currentIndex) {
        case 0:
          this.start();
          break;

        case 1:
          this.controls();
          break;
      
        default:
          break;
      }
    }
  }

  navigateMenu(index) {
    if (this.currentIndex + index >= 0 &&
      this.currentIndex + index < this.options.getLength()) {
      this.currentIndex += index;

      const option = this.options.getChildren()[this.currentIndex];
      this.cursor.setPosition(option.x, option.y);
      this.cursor.getAt(0).setX(-(option.width / 2 + 24));
      this.cursor.getAt(1).setX(option.width / 2 + 24);
    }
  }

  start() {
    // Fade out
    this.cameras.main.fadeOut(600);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('playGame', {
        player: {
          score: 0,
          gold: 0,
          lives: 6,
          maxLives: 6,
          speed: 100,
          size: { width: 16, height: 16 }
        }
      });
    }, this);
  }

  controls() {

  }
}