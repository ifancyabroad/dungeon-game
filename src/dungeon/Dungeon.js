export class Dungeon {

  constructor() {
    this.floors = [];
    this.noFloors = 3;
    this.noRooms = 10;
  }

  // Generate the entire dungeon
  generateDungeon() {
    for (let i = 1; i <= this.noFloors; i++) {
      this.floors.push({
        id: i,
        rooms: this.generateRooms(i)
      });
    }
  }

  // Create rooms for a floor
  generateRooms(floorId) {
    const rooms = [];
    for (let i = 1; i <= this.noRooms; i++) {
      rooms.push({
        floor: floorId,
        id: i,
        key: `dungeon-${floorId}-${i}`,
        music: 'dungeonMusic'
      })
    }
    return rooms;
  }

  // Get room
  getRoom(floorId, roomId) {
    const room = this.floors.find(f => f.id === floorId).rooms.find(r => r.id === roomId);
    return room;
  }
}