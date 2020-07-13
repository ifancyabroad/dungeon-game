import { Dungeon } from "../dungeon/Dungeon";

export class Game extends Phaser.Scene {

  constructor() {
    super('playGame');
  }

  create(data) {
    this.playerData = data.player;
    this.enemyData = this.cache.json.get('enemyData');
    this.weaponData = this.cache.json.get('weaponData');
    this.roomData = this.cache.json.get('roomData');

    // Create dungeon
    this.dungeon = this.createDungeon();

    // Start the game!
    this.gameStart();
  }

  update() {
  }

  // Create the dungeon
  createDungeon() {
    const dungeon = new Dungeon();
    dungeon.generateDungeon();
    return dungeon;
  }

  gameStart() {
    this.scene.launch('room', {
      room: this.dungeon.floors[0].rooms[0],
      scene: this,
      player: this.playerData
      // weapon: 'Hammer'
    });
    this.scene.bringToTop('room');
  }

  // Game over screen
  gameOver() {
    this.scene.setActive(false);
    this.scene.launch('gameOver');
    this.scene.bringToTop('gameOver');
  }
}