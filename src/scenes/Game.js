import { Player } from "../objects/Player";
import { Enemy } from "../objects/Enemy";
import { Weapon } from "../objects/Weapon";

export class Game extends Phaser.Scene {

  constructor() {
    super('playGame');
  }

  create(data) {
    // Store which room we are on
    this.level = data.level;

    // Particle manager
    this.particles = this.add.particles('dungeon-sprites').setDepth(5);

    this.generateRoom();
    this.generateEnemies();
    this.createPlayer(data.player);
    this.setCollision();

    // Fade in
    this.cameras.main.fadeIn(600);
  }

  // Run the update methods
  update() {
    this.player.update();

    if (!this.roomCleared) {
      this.enemies.getChildren().forEach(enemy => enemy.update());
      if (!this.enemies.getLength()) {
        this.roomComplete();
      }  
    }
  }

  // Generate a room
  generateRoom() {
    this.room = this.make.tilemap({ key: 'room' });
    const tileset = this.room.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles');

    // Create world layers
    this.belowLayer = this.room.createStaticLayer('Below Player', tileset, 0, 0).setDepth(1);
    this.wallsBelowLayer = this.room.createDynamicLayer('Walls Below', tileset, 0, 0).setDepth(2);
    this.wallsAboveLayer = this.room.createStaticLayer('Walls Above', tileset, 0, 0).setDepth(10);
  }

  // Populate room with enemies
  generateEnemies() {
    this.enemies = this.add.group();
    const enemyLocations = this.room.filterObjects('Enemies', (object) => object.name === 'Skeleton');
    enemyLocations.forEach(location => {
      const skeleton = this.add.sprite(0, 0, 'dungeon-sprites', 'frames/skelet_idle_anim_f0.png');
      const enemy = new Enemy(this, location.x, location.y, [skeleton]);
      this.enemies.add(enemy);
    });
    this.roomCleared = !this.enemies.getLength();
  }

  // Create the player with a weapon
  createPlayer(data) {
    const hero = this.add.sprite(0, 0, 'dungeon-sprites', 'frames/knight_m_idle_anim_f0.png');
    const weapon = new Weapon(this, 0, 0, 'dungeon-sprites', 'frames/weapon_regular_sword.png');
    this.player = new Player(
      this,
      (this.game.config.width / 2) - 16,
      (this.game.config.height / 2) - 16,
      [hero, weapon],
      data
    );
  }

  // Set collisions
  setCollision() {
    this.wallsBelowLayer.setCollisionByProperty({ collides: true });
    this.wallsAboveLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player, this.wallsBelowLayer);
    this.physics.world.addCollider(this.player, this.wallsAboveLayer);
    this.physics.world.addCollider(this.enemies);
    this.physics.world.addCollider(this.enemies, this.wallsBelowLayer);
    this.physics.world.addCollider(this.enemies, this.wallsAboveLayer);
    this.physics.world.createDebugGraphic();
  }

  // Room completed; OPEN THE DOORS!
  roomComplete() {
    console.log('Enemies destroyed!');
    this.roomCleared = true;
    this.time.delayedCall(400, () => {

      // Replace door tiles with open doors
      this.wallsBelowLayer.replaceByIndex(451, 454);
      this.wallsBelowLayer.replaceByIndex(452, 455);
      this.wallsBelowLayer.replaceByIndex(483, 486);
      this.wallsBelowLayer.replaceByIndex(484, 487);

      // Remove collision on door base
      this.wallsBelowLayer.setCollision([486, 487], false);

      // Set collision callback for door top
      const door = this.wallsBelowLayer.findByIndex(454);
      this.wallsBelowLayer.setTileLocationCallback(door.x, door.y, 1, 1, () => {
        console.log('Exit reached!');
        this.nextRoom();
      }, this);
    }, null, this);
  }

  // Proceed to the next room
  nextRoom() {
    this.level++;
    this.scene.restart({ level: this.level, player: this.player.data.getAll() });
  }

  // Game over screen
  gameOver() {
    this.scene.setActive(false);
    this.scene.launch('gameOver');
    this.scene.bringToTop('gameOver');
  }
}