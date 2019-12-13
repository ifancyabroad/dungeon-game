export class Menu extends Phaser.Scene {

  constructor() {
    super('menu');
  }

  create() {
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'graveyard')
      .setScale(0.3)
      .setDepth(0);

    this.add.text(this.game.renderer.width / 2, 100, 'DUNGEON GAME', {
      fontFamily: '"Roboto Condensed"',
      fontSize: '24px',
      strokeThickness: 1
    }).setOrigin(0.5);

    this.add.text(this.game.renderer.width / 2, 200, '(PRESS SPACEBAR TO START)', {
      fontFamily: '"Roboto Condensed"',
      fontSize: '16px',
      // strokeThickness: 1
    }).setOrigin(0.5);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    // Start game if spacebar is pressed
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {

      // Fade out
      this.cameras.main.fadeOut(600);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('playGame', {
          level: 1,
          player: {
            lives: 6,
            maxLives: 6,
            speed: 100,
            size: { width: 16, height: 16 }
          }
        });
      }, this);
    }
  }
}