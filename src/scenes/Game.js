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

    // Particle manager
    this.particles = this.add.particles('dungeon-sprites').setDepth(5);

    // Create world layers
    this.belowLayer = room.createStaticLayer('Below Player', tileset, 0, 0).setDepth(1);
    this.worldLayer = room.createStaticLayer('World', tileset, 0, 0).setDepth(10);

    // Create enemies
    const spawnPoint = room.findObject('Enemies', obj => obj.name === 'Spawn Point');
    const skeleton = this.add.sprite(0, 0, 'dungeon-sprites', 'frames/skelet_idle_anim_f0.png');
    const enemy = new Enemy(this, spawnPoint.x, spawnPoint.y, [skeleton]);
    this.enemies = this.add.group();
    this.enemies.add(enemy);

    // Create player and weapon
    const hero = this.add.sprite(0, 0, 'dungeon-sprites', 'frames/knight_m_idle_anim_f0.png');
    const weapon = new Weapon(this, 0, 0, 'dungeon-sprites', 'frames/weapon_regular_sword.png');
    this.player = new Player(this, (this.game.config.width / 2) - 16, (this.game.config.height / 2) - 16, [hero, weapon])

    // Add collision detection
    this.worldLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player, this.worldLayer);
    this.physics.world.addCollider(this.enemies, this.worldLayer);
    this.physics.world.createDebugGraphic();

    // Fade in
    this.cameras.main.fadeIn(600);
  }

  // Run the update methods
  update() {
    this.player.update();
    this.enemies.getChildren().forEach(enemy => enemy.update());
  }
}