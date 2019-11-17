import { Hero } from "../objects/Hero";
import { Enemy } from "../objects/Enemy";

export class Game extends Phaser.Scene {

  constructor() {
    super('playGame');
  }

  create() {
    const room = this.make.tilemap({ key: 'room' });
    const tileset = room.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles');

    // Create world layers and player
    this.belowLayer = room.createStaticLayer('Below Player', tileset, 0, 0)
      .setScale(2);

    this.player = new Hero(this, this.game.config.width / 2 - 16, this.game.config.height / 2 - 16, 'player');
    this.enemies = this.physics.add.group()

    const spawnPoint = room.findObject('Enemies', obj => obj.name === 'Spawn Point');
    this.enemies.add(new Enemy(this, spawnPoint.x * 2, spawnPoint.y * 2, 'skeleton'));

    this.worldLayer = room.createStaticLayer('World', tileset, 0, 0)
      .setScale(2)
      .setDepth(10);

    // Add collision between player and world
    this.worldLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.worldLayer);
    this.physics.add.overlap(this.player.sprite, this.enemies, this.contact, null, this);
    this.physics.world.createDebugGraphic();

    // this.matter.world.setBounds();
    // this.matter.world.convertTilemapLayer(this.worldLayer);
    // this.matter.world.createDebugGraphic();
  }

  contact() {
    console.log('Contact!');
  }

  update() {

    // Run the update methods
    this.player.update(this.cursorKeys);
    this.enemies.getChildren().forEach(enemy => enemy.update());
  }
}