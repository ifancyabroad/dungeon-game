export class Loading extends Phaser.Scene {

  constructor() {
    super('loadGame');
  }

  preload() {
    this.load.atlas('dungeon-sprites', 'assets/texture-atlas/0x72_DungeonTilesetII_v1.3.png', 'assets/texture-atlas/0x72_DungeonTilesetII_v1.3.json');
    this.load.image('tiles', 'assets/rooms/0x72_DungeonTilesetII_v1.3.png');
    this.load.image('graveyard', 'assets/images/background.png');
    this.load.json('enemyData', 'assets/data/enemies.json');
    this.load.json('weaponData', 'assets/data/weapons.json');
    this.load.json('roomData', 'assets/data/rooms.json');
    this.load.tilemapTiledJSON('room', 'assets/rooms/basic.json');

    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    })

    this.add.text(20, 20, 'Loading game...');
  }

  create() {
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

    this.anims.create({
      key: 'skelet_run',
      frames: this.anims.generateFrameNames('dungeon-sprites', {
        start: 0,
        end: 3,
        prefix: 'frames/skelet_run_anim_f', suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'skelet_idle',
      frames: this.anims.generateFrameNames('dungeon-sprites', {
        start: 0,
        end: 3,
        prefix: 'frames/skelet_idle_anim_f', suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.start('menu');
  }
}