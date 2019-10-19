export class Game extends Phaser.Scene {

  constructor() {
    super('playGame');
  }

  create() {
    this.player = this.add.sprite(this.game.config.width / 2 - 16, this.game.config.height / 2 - 16, 'player');
    this.player.play('knight_walk');
  }
}