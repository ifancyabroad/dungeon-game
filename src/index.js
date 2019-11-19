import Phaser from "phaser";
import { Loading } from "./scenes/Loading";
import { Game } from "./scenes/Game";
// import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    width: 400,
    height: 288
  },
  backgroundColor: 0x000000,
  scene: [Loading, Game],
  pixelArt: true,
  physics: {
    default: 'arcade',
    matter: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);
