export class Weapon extends Phaser.GameObjects.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite, frame) {
    super(scene, x, y, sprite, frame);

    this.scene = scene;

    // Create the sprite to move and animate
    this.scene.add
      .existing(this)
      .setDepth(4)
      .setOrigin(0.5, 1);

    // Set hitbox
    this.scene.physics.world.enable(this);
    this.body
      .setSize(16, 16);

    // Set collision for pickup
    this.collider = this.scene.physics.world.addOverlap(this, this.scene.player, this.equip, null, this);

    // States
    /*  0: Not equipped/active
    *   1: Equipped/active
    *   2: In use
    */  

    // Custom variables
    this.setState(0);
    this.setName('weapon');
    this.damage = 50;
    this.knockback = 5;
  }

  update(player) {
    if (this.state !== 0) {
      this.setSprite(player.sprite);
    }
  }

  // Position the weapon correctly based on player orientation
  setSprite(player) {
    if (player.flipX) {
      this.setX(-4);
      this.body.setOffset(-16, 5);
    } else {
      this.setX(4);
      this.body.setOffset(8, 5);
    }
  }

  // Weapon picked up
  equip() {
    this.setY(4);
    this.setState(1);
    this.scene.physics.world.removeCollider(this.collider);
    this.scene.player.pickup(this)
  }

  // Weapon dropped
  unequip() {
    this.setState(0);
    this.scene.physics.world.colliders.add(this.collider);
  }

  // Play attack animation
  attack(player) {
    if (this.state !== 2) {

      // Set in use to stop multiple attacks at once
      this.setState(2);

      // Set the collision
      this.scene.physics.overlap(this, this.scene.enemies, player.hit, null, player);

      // Start animation
      this.scene.add.tween({
        targets: this,
        angle: player.sprite.flipX ? -90 : 90,
        duration: 100,
        yoyo: true,
        onComplete() {
          this.setState(1);
        },
        callbackScope: this
      });
    }
  }
}