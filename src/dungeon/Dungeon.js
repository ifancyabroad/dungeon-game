export class Dungeon {

  constructor() {
    this.floors = [];
    this.noFloors = 5;
    this.noRooms = 5;
    this.currentFloor = 0;
  }

  // Generate the entire dungeon
  generateDungeon() {
    for (let i = 0; i < this.noFloors; i++) {
      this.floors.push(this.generateFloor());
    }
  }

  // Create a floor
  generateFloor() {
    const floor = [];
    for (let i = 0; i < this.noRooms; i++) {
      floor.push({
        id: i,
        roomKey: 'room'
      })
    }
    return floor;
  }

  // Get next room
  getRoom(roomId) {
    return this.floors[this.currentFloor][roomId];
  }
}