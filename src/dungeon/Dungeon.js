export class Dungeon {

  constructor(floorData) {
    this.floors = [];
    this.floorData = floorData;
  }

  // Generate the entire dungeon
  generateDungeon() {
    let id = 1;
    for (const floor of this.floorData) {
      this.floors.push({
        id: id,
        name: floor.name,
        rooms: this.generateRooms(id, floor)
      });
      id++;
    }
  }

  // Create rooms for a floor
  generateRooms(id, floor) {
    const rooms = [];
    for (let i = 1; i <= floor.rooms; i++) {
      rooms.push({
        floor: id,
        id: i,
        key: `dungeon-${id}-${i}`,
        music: floor.music,
        boss: i === floor.rooms,
        shop: false
      })
    }
    return rooms;
  }

  // Get floor
  getFloor(floorId) {
    const floor = this.floors.find(f => f.id === floorId);
    return floor;
  }

  // Get room
  getRoom(floorId, roomId) {
    const room = this.floors.find(f => f.id === floorId).rooms.find(r => r.id === roomId);
    return room;
  }
}