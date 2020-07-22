import { Dungeon } from "../dungeon/Dungeon";

export class Game extends Phaser.Scene {

  constructor() {
    super('playGame');
  }

  create(data) {
    this.playerData = data.player;
    this.enemyData = this.cache.json.get('enemyData');
    this.npcData = this.cache.json.get('npcData');
    this.weaponData = this.cache.json.get('weaponData');
    this.roomData = this.cache.json.get('roomData');

    // Create dungeon
    this.dungeon = this.createDungeon();

    // Start the game!
    this.gameStart();
  }

  // Create the dungeon
  createDungeon() {
    const dungeon = new Dungeon([
      { name: 'Orc Perimeter', music: 'dungeonMusic', rooms: 5 },
      { name: 'Undead Prison', music: 'dungeonMusic', rooms: 5 },
      { name: 'Demon Cave', music: 'dungeonMusic', rooms: 5 }
    ]);
    dungeon.generateDungeon();
    return dungeon;
  }

  // Transition scene that launches the room
  gameStart() {
    this.scene.launch('transition', {
      floor: this.dungeon.floors[0],
      room: this.dungeon.floors[0].rooms[0],
      player: this.playerData
    });
  }

  // Game over screen
  gameOver() {
    this.scene.setActive(false);
    this.scene.launch('gameOver');
    this.scene.bringToTop('gameOver');
  }
}