import Phaser from "phaser";
import { Loading } from "./scenes/Loading";
import { Menu } from "./scenes/Menu";
import { Game } from "./scenes/Game";
import { HUD } from "./scenes/HUD";
import { Room } from "./scenes/Room";
import { Transition } from "./scenes/Transition";
import { GameOver } from "./scenes/GameOver";
import { Credits } from "./scenes/Credits";
// import logoImg from "./assets/logo.png";

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 400,
    height: 288
  },
  backgroundColor: 0x000000,
  scene: [Loading, Menu, Game, HUD, Room, Transition, GameOver, Credits],
  pixelArt: true,
  physics: {
    default: 'arcade'
  }
};

const game = new Phaser.Game(config);
