import { Weapon } from "../objects/Weapon";
import { Player } from "../objects/Player";
import { Enemy } from "../objects/Enemy";
import { Coin } from "../objects/Coin";
import { Spikes } from "../objects/Spikes";

export class Room extends Phaser.Scene {

  constructor() {
    super('room');
  }

  create(data) {
    this.roomKey = data.room.key;
    this.roomId = data.room.id;
    this.floorId = data.room.floor
    this.mainScene = data.scene;
    this.cleared = false;
    this.bossRoom = this.roomId === this.mainScene.dungeon.noRooms;

    this.startMusic(data.room.music);
    this.generateRoom();
    this.generatePlayer(data.player);
    this.generateEnemies();
    this.generateWeapons(data.weapon);
    this.generateItems();
    this.generateSpikes();
    this.setCollision();

    // Fade in
    this.cameras.main.fadeIn(600);
  }

  update() {
    this.player.update();
    this.enemies.getChildren().forEach(enemy => enemy.update());
    this.weapons.getChildren().forEach(weapon => weapon.update());
    if (!this.cleared && !this.enemies.getLength()) {
      this.roomComplete();
    }  
  }

  // Check music
  startMusic(roomMusic) {
    this.music = this.sound.sounds.find(sound => sound.key === roomMusic);
    if (!this.music) {
      this.music = this.sound.add(roomMusic);
    }
    if (!this.music.isPlaying) {
      this.sound.stopAll();
      this.music.play({
        loop: true,
        volume: 0.1
      });
    }
  }

  // Generate a room
  generateRoom() {
    this.room = this.make.tilemap({ key: this.roomKey });
    const tileset = this.room.addTilesetImage('0x72_DungeonTilesetII_v1.3', 'tiles');

    // Create world layers
    this.belowLayer = this.room.createDynamicLayer('Below Player', tileset, 0, 0).setDepth(1);
    this.wallsBelowLayer = this.room.createDynamicLayer('Walls Below', tileset, 0, 0).setDepth(2);
    this.wallsAboveLayer = this.room.createStaticLayer('Walls Above', tileset, 0, 0).setDepth(10);
  }

  // Generate the player
  generatePlayer(data) {
    const hero = this.add.sprite(0, 0, 'dungeon-sprites', 'frames/knight_m_idle_anim_f0.png');
    const spawn = this.room.filterObjects('Player', (object) => object.name === 'Spawn')[0];
    this.player = new Player(
      this,
      spawn.x,
      spawn.y,
      [hero],
      data
    );
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

  // Populate room with consumables
  generateItems() {
    this.items = this.add.group();
    const itemLayer = this.room.getObjectLayer('Items');
    if (itemLayer) {
      itemLayer.objects.forEach(object => {
        const coin = new Coin(this, object.x, object.y, 'dungeon-sprites', 'frames/coin_anim_f0.png');
        this.items.add(coin);
      });
    }
  }

  // Replace spike tiles with interactable spike objects
  generateSpikes() {
    this.spikes = this.add.group();
    this.belowLayer.forEachTile(tile => {
      if (tile.index === 357) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        const spikes = new Spikes(this, x, y, 'frames/floor_spikes_anim_f0.png')
        this.spikes.add(spikes);

        // And lastly, remove the spike tile from the layer
        this.belowLayer.removeTileAt(tile.x, tile.y);
      }
    });
  }

  // Set collisions
  setCollision() {
    this.wallsBelowLayer.setCollisionByProperty({ collides: true });
    this.wallsAboveLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player, this.belowLayer);
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
      if (this.bossRoom) {
        this.sound.play('stairs-open');

        // Replace floor tile with stairs down
        const hiddenLayer = this.room.getObjectLayer('Hidden');
        const exit = hiddenLayer.objects.find(object => object.name === 'Exit');
        this.belowLayer.removeTileAtWorldXY(exit.x, exit.y);
        this.belowLayer.putTileAtWorldXY(358, exit.x, exit.y);

        // Set collision callback for stairs
        const stairs = this.belowLayer.findByIndex(358);
        this.belowLayer.setTileLocationCallback(stairs.x, stairs.y, 1, 1, this.nextRoom, this);

        // Update player score
        this.player.updateScore(500);  
      } else {
        this.sound.play('door-open');
  
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
  
        // Update player score
        this.player.updateScore(100);   
      }
    }, null, this);
  }

  // Proceed to the next room
  nextRoom() {
    let nextRoom = this.roomId + 1;
    let nextRoomFloor = this.floorId;

    if (this.bossRoom) {
      nextRoom = 1;
      nextRoomFloor++;
    }

    this.scene.restart({
      room: this.mainScene.dungeon.getRoom(nextRoomFloor, nextRoom),
      scene: this.mainScene,
      player: this.player.data.getAll(),
      weapon: this.player.weapon ? this.player.weapon.name : null
    });
  }
}