export class GameOver extends Phaser.Scene {

  constructor() {
    super('gameOver');
  }

  create() {
    this.add.text(this.game.renderer.width / 2, 100, 'GAME OVER', {
      fontFamily: '"Roboto Condensed"',
      fontSize: '24px',
      strokeThickness: 1
    }).setOrigin(0.5);

    this.add.text(this.game.renderer.width / 2, 200, '(PRESS SPACEBAR TO RETURN TO MENU)', {
      fontFamily: '"Roboto Condensed"',
      fontSize: '16px',
      // strokeThickness: 1
    }).setOrigin(0.5);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    // Return to menu if spacebar is pressed
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {

      // Fade out
      this.cameras.main.fadeOut(600);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.stop('room');
        this.scene.stop('playGame');
        this.scene.start('menu');
      }, this);
    }
  }
}