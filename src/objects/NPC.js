import { Entity } from "./Entity";

export class NPC extends Entity {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, children, data) {
    super(scene, x, y, children, data);

    // Set physics body properties
    this.body.setOffset(0, 6);

    // Custom variables
    this.setData({
      type: data.type,
      size: data.size,
      sprite: data.sprite
    });

    this.sprite.play(`${this.data.values.sprite}_Idle`, true);
  }

  update() {
    
  }
}