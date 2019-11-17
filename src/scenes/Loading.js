import textureAtlas from '../assets/texture-atlas/0x72_DungeonTilesetII_v1.3.png';
import textureAtlasData from '../assets/texture-atlas/0x72_DungeonTilesetII_v1.3.json';

import rooms from '../assets/rooms/0x72_DungeonTilesetII_v1.3.png';
import roomsData from '../assets/rooms/basic.json';

import mKnightSprite from '../assets/texture-atlas/frames/knight_m_idle_anim_f0.png';
import regularSword from '../assets/texture-atlas/frames/weapon_regular_sword.png';

import skeletonSprite from '../assets/texture-atlas/frames/skelet_idle_anim_f0.png';

export class Loading extends Phaser.Scene {

  constructor() {
    super('loadGame');
  }

  preload() {
    this.load.atlas('dungeon-sprites', textureAtlas, textureAtlasData);
    this.load.image('player', mKnightSprite);
    this.load.image('sword', regularSword);

    this.load.image('skeleton', skeletonSprite);

    this.load.image('tiles', rooms);
    this.load.tilemapTiledJSON('room', roomsData);
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

    this.add.text(20, 20, 'Loading game...');
    this.scene.start('playGame');
  }
}