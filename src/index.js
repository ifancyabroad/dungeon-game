import Phaser from "phaser";
import { Loading } from "./scenes/Loading";
import { Game } from "./scenes/Game";
// import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [Loading, Game],
  pixelArt: true,
};

const game = new Phaser.Game(config);
