import Phaser from "phaser";
import { Loading } from "./scenes/Loading";
import { Menu } from "./scenes/Menu";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { Room } from "./scenes/Room";
// import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 400,
    height: 288
  },
  backgroundColor: 0x000000,
  scene: [Loading, Menu, Game, Room, GameOver],
  pixelArt: true,
  physics: {
    default: 'arcade'
  }
};

const game = new Phaser.Game(config);
