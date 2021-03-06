export class Loading extends Phaser.Scene {

  constructor() {
    super('loadGame');
  }

  preload() {
    // Sprites
    this.load.atlas('dungeon-sprites', 'assets/texture-atlas/0x72_DungeonTilesetII_v1.3.png', 'assets/texture-atlas/0x72_DungeonTilesetII_v1.3.json');
    this.load.atlas('npc-sprites', 'assets/npcs/knights.png', 'assets/npcs/knights.json');
    this.load.image('tiles', 'assets/rooms/0x72_DungeonTilesetII_v1.3.png');
    this.load.image('orc-blood', 'assets/textures/orc-blood.png');
    this.load.image('undead-blood', 'assets/textures/undead-blood.png');
    this.load.image('demon-blood', 'assets/textures/demon-blood.png');

    // Sounds
    this.load.audio('coin', 'assets/sounds/coin.mp3');
    this.load.audio('weapon-swing', 'assets/sounds/weapon-swing.mp3');
    this.load.audio('weapon-drop', 'assets/sounds/weapon-drop.mp3');
    this.load.audio('door-open', 'assets/sounds/door-open.wav');
    this.load.audio('stairs-open', 'assets/sounds/stairs-open.mp3');
    this.load.audio('orc-hit', 'assets/sounds/orc-hit.mp3');
    this.load.audio('orc-death', 'assets/sounds/orc-death.mp3');
    this.load.audio('undead-hit', 'assets/sounds/undead-hit.mp3');
    this.load.audio('undead-death', 'assets/sounds/undead-death.mp3');
    this.load.audio('demon-hit', 'assets/sounds/demon-hit.mp3');
    this.load.audio('demon-death', 'assets/sounds/demon-death.mp3');
    this.load.audio('menuSelect', 'assets/sounds/select.mp3');
    this.load.audio('menuMusic', 'assets/sounds/POL-random-encounter-short.wav');
    this.load.audio('dungeonMusic', 'assets/sounds/POL-fortress-short.wav');

    // Images
    this.load.image('caves', 'assets/images/background.png');
    this.load.image('logo', 'assets/images/logo.png');

    // JSON
    this.load.json('enemyData', 'assets/data/enemies.json');
    this.load.json('npcData', 'assets/data/npcs.json');
    this.load.json('weaponData', 'assets/data/weapons.json');
    this.load.json('roomData', 'assets/data/rooms.json');

    const floors = 3;
    const rooms = 5;
    for (let i = 1; i <= floors; i++) {
      for (let ii = 1; ii <= rooms; ii++) {
        this.load.tilemapTiledJSON(`dungeon-${i}-${ii}`, `assets/rooms/dungeon-${i}-${ii}.json`);
      }
    }

    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    })

    this.add.text(40, 100, 'Loading...', { fontFamily: 'EquipmentPro' });
  }

  create() {
    this.generatePlayerAnimations();
    this.generateEnemyAnimations();
    this.generateNPCAnimations();
    this.generateItemAnimations();
    this.generateSpikeAnimations();
    this.scene.start('menu');
  }

  generatePlayerAnimations() {
    this.anims.create({
      key: 'knight_run',
      frames: this.anims.generateFrameNames('dungeon-sprites', {
        start: 0,
        end: 3,
        prefix: 'frames/knight_m_run_anim_f', suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'knight_idle',
      frames: this.anims.generateFrameNames('dungeon-sprites', {
        start: 0,
        end: 3,
        prefix: 'frames/knight_m_idle_anim_f', suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'knight_hit',
      frames: this.anims.generateFrameNames('dungeon-sprites', {
        start: 0,
        end: 0,
        prefix: 'frames/knight_m_hit_anim_f', suffix: '.png'
      }),
      frameRate: 1,
      repeat: -1
    });
  }

  generateEnemyAnimations() {
    const enemyData = this.cache.json.get('enemyData');
    enemyData.forEach(enemy => {
      enemy.animations.forEach(animation => {
        this.anims.create({
          key: animation,
          frames: this.anims.generateFrameNames('dungeon-sprites', {
            start: 0,
            end: 3,
            prefix: `frames/${animation}_anim_f`, suffix: '.png'
          }),
          frameRate: 10,
          repeat: -1
        });
      })
    });
  }

  generateNPCAnimations() {
    const npcData = this.cache.json.get('npcData');
    npcData.forEach(npc => {
      npc.animations.forEach(animation => {
        this.anims.create({
          key: animation,
          frames: this.anims.generateFrameNames('npc-sprites', {
            start: 1,
            end: 4,
            prefix: `frames/${animation}_`, suffix: '.png'
          }),
          frameRate: 10,
          repeat: -1
        });
      })
    });
  }

  generateItemAnimations() {
    this.anims.create({
      key: 'coin',
      frames: this.anims.generateFrameNames('dungeon-sprites', {
        start: 0,
        end: 3,
        prefix: `frames/coin_anim_f`, suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });
  }

  generateSpikeAnimations() {
    this.anims.create({
      key: 'floor_spikes',
      frames: this.anims.generateFrameNames('dungeon-sprites', {
        start: 0,
        end: 3,
        prefix: `frames/floor_spikes_anim_f`, suffix: '.png'
      }),
      frameRate: 5,
      repeat: -1
    });
  }
}