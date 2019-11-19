import { Player } from "../objects/Player";
import { Enemy } from "../objects/Enemy";
import { Weapon } from "../objects/Weapon";

export class Game extends Phaser.Scene {

  constructor() {
    super('playGame');
  }

  create() {
    const room = this.make.tilemap({ key: 'room' });
    const tileset = room.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles');

    // Create world layers
    this.belowLayer = room.createStaticLayer('Below Player', tileset, 0, 0).setDepth(1);
    this.worldLayer = room.createStaticLayer('World', tileset, 0, 0).setDepth(10);

    // Create player and weapon
    const hero = this.add.sprite(0, 0, 'knight');
    const weapon = new Weapon(this, 4, 4, 'sword');
    this.player = new Player(this, (this.game.config.width / 2) - 16, (this.game.config.height / 2) - 16, [hero, weapon])

    // Create enemies
    const spawnPoint = room.findObject('Enemies', obj => obj.name === 'Spawn Point');
    const skeleton = this.add.sprite(0, 0, 'skeleton');
    const enemy = new Enemy(this, spawnPoint.x, spawnPoint.y, [skeleton]);
    this.enemies = this.physics.add.group();
    this.enemies.add(enemy);

    // Add collision detection
    this.worldLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player, this.worldLayer);
    this.physics.world.addCollider(this.enemies, this.worldLayer);
    this.physics.world.addCollider(this.player, this.enemies, this.contact, null, this);
    this.physics.world.createDebugGraphic();
  }

  contact() {
    console.log('Player Contact!');
  }

  update() {
    // Run the update methods
    this.player.update();
    this.enemies.getChildren().forEach(enemy => enemy.update());
  }
}