import textureAtlas from '../assets/texture-atlas/0x72_DungeonTilesetII_v1.3.png';
import textureAtlasData from '../assets/texture-atlas/0x72_DungeonTilesetII_v1.3.json';

import rooms from '../assets/rooms/0x72_DungeonTilesetII_v1.3.png';
import roomsData from '../assets/rooms/basic.json';

import graveyard from "../assets/images/background.png";

export class Loading extends Phaser.Scene {

  constructor() {
    super('loadGame');
  }

  preload() {
    this.load.atlas('dungeon-sprites', textureAtlas, textureAtlasData);
    this.load.image('tiles', rooms);
    this.load.tilemapTiledJSON('room', roomsData);

    this.load.image('graveyard', graveyard);

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
      key: 'skeleton_idle',
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