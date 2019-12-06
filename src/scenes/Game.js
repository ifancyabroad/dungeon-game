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
    this.wallsBelowLayer = room.createStaticLayer('Walls Below', tileset, 0, 0).setDepth(2);
    this.wallsAboveLayer = room.createStaticLayer('Walls Above', tileset, 0, 0).setDepth(10);

    // Create enemies
    this.enemies = this.add.group();
    const enemyLocations = room.filterObjects('Enemies', (object) => object.name === 'Skeleton');
    enemyLocations.forEach(location => {
      const skeleton = this.add.sprite(0, 0, 'dungeon-sprites', 'frames/skelet_idle_anim_f0.png');
      const enemy = new Enemy(this, location.x, location.y, [skeleton]);
      this.enemies.add(enemy);
    })

    // Create player and weapon
    const hero = this.add.sprite(0, 0, 'dungeon-sprites', 'frames/knight_m_idle_anim_f0.png');
    const weapon = new Weapon(this, 0, 0, 'dungeon-sprites', 'frames/weapon_regular_sword.png');
    this.player = new Player(this, (this.game.config.width / 2) - 16, (this.game.config.height / 2) - 16, [hero, weapon])

    // Add collision detection
    this.wallsBelowLayer.setCollisionByProperty({ collides: true });
    this.wallsAboveLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player, this.wallsBelowLayer);
    this.physics.world.addCollider(this.player, this.wallsAboveLayer);
    this.physics.world.addCollider(this.enemies);
    this.physics.world.addCollider(this.enemies, this.wallsBelowLayer);
    this.physics.world.addCollider(this.enemies, this.wallsAboveLayer);
    this.physics.world.createDebugGraphic();

    // Fade in
    this.cameras.main.fadeIn(600);
  }

  // Run the update methods
  update() {
    this.player.update();
    this.enemies.getChildren().forEach(enemy => enemy.update());
  }

  // Game over screen
  gameOver() {
    this.scene.setActive(false);
    this.scene.launch('gameOver');
    this.scene.bringToTop('gameOver');
  }
}