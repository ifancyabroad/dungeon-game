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

    for (let i = 1; i <= 10; i++) {
      this.load.tilemapTiledJSON(`room${i}`, `assets/rooms/basic${i}.json`);
    }

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
    this.generatePlayerAnimations();
    this.generateEnemyAnimations();
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
}