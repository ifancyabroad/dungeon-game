export class Game extends Phaser.Scene {

  constructor() {
    super('playGame');
  }

  create() {
    const room = this.make.tilemap({key: 'room' });
    const tileset = room.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles');

    const belowLayer = room.createStaticLayer('Below Player', tileset, 0, 0);
    this.player = this.add.sprite(this.game.config.width / 2 - 16, this.game.config.height / 2 - 16, 'player');
    this.player.play('knight_walk');
    const worldLayer = room.createStaticLayer('World', tileset, 0, 0);
  }
}