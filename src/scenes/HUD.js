export class HUD extends Phaser.Scene {

  constructor() {
    super('hud');
  }

  create(data) {
    this.room = data.room;
    this.player = data.player;
    this.setHearts();
    this.setScore();
    this.setGold();

    //  Listen for events
    this.room.events.on('updateHearts', this.updateHearts, this);
    this.room.events.on('updateScore', this.updateScore, this);
    this.room.events.on('updateGold', this.updateGold, this);
  }

  update() {
    
  }

  // Add hearts display
  setHearts() {
    this.hearts = [];
    let x = 10;
    let y = 10;
    const maxHearts = this.player.getData('maxLives') / 2;
    const currentHearts = this.player.getData('lives') / 2;
    for (let i = 0; i < maxHearts; i++) {
      if (currentHearts >= i + 1) {
        this.hearts.push(this.add.image(x, y, 'dungeon-sprites', 'frames/ui_heart_full.png'));
      } else if (i + 1 - currentHearts === 0.5) {
        this.hearts.push(this.add.image(x, y, 'dungeon-sprites', 'frames/ui_heart_half.png'));
      } else {
        this.hearts.push(this.add.image(x, y, 'dungeon-sprites', 'frames/ui_heart_empty.png'));
      }
      x += 16;
    }
  }

  // Update player hearts in the UI
  updateHearts() {
    const maxHearts = this.player.getData('maxLives') / 2;
    const currentHearts = this.player.getData('lives') / 2;
    for (let i = 0; i < maxHearts; i++) {
      if (currentHearts >= i + 1) {
        this.hearts[i].setTexture('dungeon-sprites', 'frames/ui_heart_full.png');
      } else if (i + 1 - currentHearts === 0.5) {
        this.hearts[i].setTexture('dungeon-sprites', 'frames/ui_heart_half.png');
      } else {
        this.hearts[i].setTexture('dungeon-sprites', 'frames/ui_heart_empty.png');
      }
    }
  }

  // Add score display
  setScore() {
    let x = this.game.renderer.width - 5;
    let y = 10;
    this.scoreDisplay = this.add.text(x, y, `Score: ${this.player.getData('score')}`, {
      fontFamily: 'EquipmentPro',
      fontSize: '18px'
    }).setOrigin(1, 0.5);
  }

  // Update score
  updateScore() {
    this.scoreDisplay.setText(`Score: ${this.player.getData('score')}`);
  }

  // Add gold display
  setGold() {
    let x = 80;
    let y = 10;
    const goldIcon = this.add.image(x, y, 'dungeon-sprites', 'frames/coin_anim_f0.png').setScale(1.5);
    this.goldDisplay = this.add.text(goldIcon.x + goldIcon.width + 2, y, this.player.getData('gold'), {
      fontFamily: 'EquipmentPro',
      fontSize: '18px'
    }).setOrigin(0, 0.5);
  }

  // Update gold
  updateGold() {
    this.goldDisplay.setText(this.player.getData('gold'));
  }
}