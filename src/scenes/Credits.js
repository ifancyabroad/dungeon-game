export class Credits extends Phaser.Scene {

  constructor() {
    super('credits');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    const credits = [
      { title: 'Sprites', names: ['itch.io - 0x72'] },
      { title: 'Font', names: ['itch.io - somepx '] },
      { title: 'Music', names: ['playonloop.com'] },
      { title: 'SFX', names: ['zapsplat.com'] },
      { title: 'Everything else', names: ['Edgar Nightingale'] }
    ];
  
    this.lineHeight = 17;
    this.y = this.game.renderer.height;
    this.add.text(this.game.renderer.width / 2, this.y, 'Pixel Dungeon', {
      fontFamily: 'EquipmentPro',
      fontSize: '24px'
    }).setOrigin(0.5);

    this.y += 50;
    for (const credit of credits) {
      
      const line = this.add.text(this.game.renderer.width / 2 - 5, this.y, credit.title, {
        fontFamily: 'EquipmentPro',
        fontSize: '16px',
        fixedHeight: this.lineHeight
      }).setOrigin(1, 0.5);
      
      let yy = this.y
      for (const name of credit.names) {
        this.add.text(this.game.renderer.width / 2 + 5, yy, name, {
          fontFamily: 'EquipmentPro',
          fontSize: '16px',
          fixedHeight: this.lineHeight
        }).setOrigin(0, 0.5);
        yy += this.lineHeight;
      }

      this.y += credit.names.length * this.lineHeight + 20;
    }

    this.y += this.game.renderer.height / 2;
    this.add.text(this.game.renderer.width / 2, this.y, 'Thanks for playing!', {
      fontFamily: 'EquipmentPro',
      fontSize: '24px'
    }).setOrigin(0.5);
  }

  update() {
    if (this.y > this.cameras.main.scrollY - 15) {
      this.cameras.main.scrollY += 1;
    } else {
      this.scene.stop();
    }
  }
}