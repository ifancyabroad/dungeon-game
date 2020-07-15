export class Transition extends Phaser.Scene {

  constructor() {
    super('transition');
  }

  create(data) {
    const floor = data.floor;
    const scene = data.scene;

    this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, `Dungeon-${floor}`, {
      fontFamily: 'EquipmentPro',
      fontSize: '24px'
    }).setOrigin(0.5);

    this.cameras.main.fadeIn(600);
    this.time.delayedCall(1000, () => {
      this.cameras.main.fadeOut(600);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('room', {
          room: scene.room,
          player: scene.player,
          weapon: scene.weapon
        });
      }, this);
    });
  }
}