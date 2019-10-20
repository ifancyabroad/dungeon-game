import { Hero } from "../objects/Hero";

export class Game extends Phaser.Scene {

  constructor() {
    super('playGame');
  }

  create() {
    const room = this.make.tilemap({ key: 'room' });
    const tileset = room.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles');

    this.belowLayer = room.createStaticLayer('Below Player', tileset, 0, 0).setScale(2);
    this.player = new Hero(this, this.game.config.width / 2 - 16, this.game.config.height / 2 - 16, 'player');
    this.worldLayer = room.createStaticLayer('World', tileset, 0, 0).setScale(2);

    // Add collision between player and world
    this.worldLayer.setCollisionFromCollisionGroup();
    this.physics.add.collider(this.player, this.worldLayer);

    // Create movement keys
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {

    // Run the update methods
    this.player.update(this.cursorKeys);
  }
}