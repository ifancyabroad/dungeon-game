export class Weapon extends Phaser.GameObjects.Sprite {

  // Take the scene, position and sprite as arguments for creation
  constructor(scene, x, y, sprite, frame, data) {
    super(scene, x, y, sprite, frame);

    this.scene = scene;

    // Create the sprite to move and animate
    this.scene.add
      .existing(this)
      .setDepth(4)
      .setOrigin(0.5, 1.2);

    // Set hitbox and collision
    this.scene.physics.world.enable(this);
    this.collider = this.scene.physics.world.addOverlap(this, this.scene.player, this.equip, null, this);
    
    // States
    /*  0: Not equipped/active
    *   1: Equipped/active
    *   2: In use
    *   3: Just dropped
    */  
    this.setState(0);

    // Custom variables
    this.flipped = false;
    this.setName(data.name);
    this.setData({
      damage: data.stats.damage,
      knockback: data.stats.knockback,
      sprite: data.sprite,
      size: data.size
    });
  }

  update() {
    this.stateManager();
  }

  // Position the weapon correctly based on player orientation
  setSprite() {
    const mouse = this.scene.input.activePointer;
    const angle = Phaser.Math.Angle.BetweenPoints(this.parentContainer, mouse); // Facing pointer
    const spriteAngle = (Phaser.Math.RAD_TO_DEG * angle) + 90 + (this.flipped ? 120 : angle -120);
    this.setAngle(spriteAngle);

    const vx = Math.cos(angle) * 10;
    const vy = Math.sin(angle) * 10;
    this.body.setOffset(vx - (this.getData('size').width / 2), vy + (this.getData('size').height / 2));
  }

  // Check if in contact with player
  overlapCheck() {
    if (!this.scene.physics.overlap(this, this.scene.player)) {
      this.setState(0);
    }
  }

  // Decide what to do
  stateManager() {
    switch (this.state) {
      case 1:
        this.setSprite();
        break;

      case 2:
        // this.setSprite();
        break;

      case 3:
        this.overlapCheck();
        break;
    }
  }

  // Weapon picked up
  equip(weapon, player) {
    if (this.state === 0) {
      player.pickup(this)
      this.setState(1)
        .setPosition(0, player.height / 2);
      this.body
        .setCircle(this.getData('size').width);
      this.scene.physics.world.removeCollider(this.collider);
    }
  }

  // Weapon dropped
  unequip(player) {
    player.drop(this);
    this.setState(3)
      .setAngle()
      .setPosition(player.body.x + this.width / 2, player.body.y + this.height / 2)
      .setDepth(4);
    this.body.setSize();
    this.body.preUpdate()
    this.scene.physics.world.colliders.add(this.collider);
    this.scene.add
      .existing(this);
  }

  // Play attack animation
  attack(player) {
    if (this.state === 1) {

      // Set in use to stop multiple attacks at once
      this.setState(2);

      // Set the collision
      this.scene.physics.overlap(this, this.scene.enemies, player.hit, null, player);

      // Start animation
      this.scene.add.tween({
        targets: this,
        angle: this.angle + (this.flipped ? -240 : 240),
        duration: 100,
        completeDelay: 200,
        onComplete() {
          this.flipped = !this.flipped;
          this.setSprite();
          this.setState(1);
        },
        callbackScope: this
      });
    }
  }
}