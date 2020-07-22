export class GameOver extends Phaser.Scene {

  constructor() {
    super('gameOver');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.add.text(this.game.renderer.width / 2, 120, 'GAME OVER', {
      fontFamily: 'EquipmentPro',
      fontSize: '24px',
      strokeThickness: 1
    }).setOrigin(0.5);

    this.add.text(this.game.renderer.width / 2, 140, '(PRESS SPACEBAR TO RETURN TO MENU)', {
      fontFamily: 'EquipmentPro',
      fontSize: '16px',
      // strokeThickness: 1
    }).setOrigin(0.5);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Fade in
    this.cameras.main.fadeIn(600);
  }

  update() {
    // Return to menu if spacebar is pressed
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.sound.stopAll();
      this.sound.play('menuSelect');

      // Fade out
      this.cameras.main.fadeOut(600);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.stop('hud');
        this.scene.stop('room');
        this.scene.stop('playGame');
        this.scene.start('menu');
      }, this);
    }
  }
}