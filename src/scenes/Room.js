import { Weapon } from "../objects/Weapon";
import { Player } from "../objects/Player";
import { Enemy } from "../objects/Enemy";

export class Room extends Phaser.Scene {

  constructor() {
    super('room');
  }

  create(data) {
    this.roomKey = data.room.roomKey;
    this.roomId = data.room.id;
    this.floorId = data.room.floor
    this.mainScene = data.scene;

    // Particle manager
    this.particles = this.add.particles('dungeon-sprites').setDepth(5);

    this.createPlayer(data.player);
    this.generateRoom();
    this.generateEnemies();
    this.generateWeapons(data.weapon);
    this.setCollision();

    // Fade in
    this.cameras.main.fadeIn(600);
  }

  update() {
    this.player.update();
    if (!this.cleared) {
      this.enemies.getChildren().forEach(enemy => enemy.update());
      if (!this.enemies.getLength()) {
        this.roomComplete();
      }  
    }
    this.weapons.getChildren().forEach(weapon => weapon.update());
  }

  // Create the player with a weapon
  createPlayer(data) {
    const hero = this.add.sprite(0, 0, 'dungeon-sprites', 'frames/knight_m_idle_anim_f0.png');
    this.player = new Player(
      this,
      (this.game.config.width / 2) - 16,
      (this.game.config.height / 2) - 16,
      [hero],
      data
    );
  }

  // Generate a room
  generateRoom() {
    this.room = this.make.tilemap({ key: this.roomKey });
    const tileset = this.room.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles');

    // Create world layers
    this.belowLayer = this.room.createStaticLayer('Below Player', tileset, 0, 0).setDepth(1);
    this.wallsBelowLayer = this.room.createDynamicLayer('Walls Below', tileset, 0, 0).setDepth(2);
    this.wallsAboveLayer = this.room.createStaticLayer('Walls Above', tileset, 0, 0).setDepth(10);
  }

  // Populate room with enemies
  generateEnemies() {
    this.enemies = this.add.group();
    const enemyLayer = this.room.getObjectLayer('Enemies');
    if (enemyLayer) {
      enemyLayer.objects.forEach(object => {
        const data = this.mainScene.enemyData.find(e => e.name === object.name)
        const sprite = this.add.sprite(0, 0, 'dungeon-sprites', `frames/${data.sprite}_idle_anim_f0.png`);
        const enemy = new Enemy(this, object.x, object.y, [sprite], data);
        this.enemies.add(enemy);
      });
    }
    this.cleared = !this.enemies.getLength();
  }

  // Populate room with any weapons
  generateWeapons(weapon) {
    this.weapons = this.add.group();

    // Currently equipped weapon
    if (weapon) {
      const data = this.mainScene.weaponData.find(w => w.name === weapon)
      const playerWeapon = new Weapon(this, this.player.x, this.player.y, 'dungeon-sprites', `frames/weapon_${data.sprite}.png`, data);
      this.weapons.add(playerWeapon);
      playerWeapon.equip(playerWeapon, this.player);
    }

    // Room weapons
    const weaponLayer = this.room.getObjectLayer('Weapons');
    if (weaponLayer) {
      weaponLayer.objects.forEach(object => {
        const data = this.mainScene.weaponData.find(w => w.name === object.name)
        const weapon = new Weapon(this, object.x, object.y, 'dungeon-sprites', `frames/weapon_${data.sprite}.png`, data);
        this.weapons.add(weapon);
      });
    }
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
    this.cleared = true;
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
      this.wallsBelowLayer.setTileLocationCallback(door.x, door.y, 1, 1, this.nextRoom, this);
    }, null, this);
  }

  // Proceed to the next room
  nextRoom() {
    const finalRoom = this.mainScene.dungeon.noRooms
    let nextRoom = this.roomId + 1;
    let nextRoomFloor = this.floorId;

    if (this.roomId >= finalRoom) {
      nextRoom = 1;
      nextRoomFloor++;
    }

    this.scene.restart({
      room: this.mainScene.dungeon.getRoom(nextRoomFloor, nextRoom),
      scene: this.mainScene,
      player: this.player.data.getAll(),
      weapon: this.player.weapon.name
    });
  }
}