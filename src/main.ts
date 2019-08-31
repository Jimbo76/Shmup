/** @type {import("../typings/phaser")} */

import { LoadScene } from './scenes/LoadScene';
// import { MenuScene } from './scenes/MenuScene';
// import { PlayScene } from './scenes/PlayScene';
// import { endScene } from './scenes/endScene';
// import { CST } from './CST';

let game = new Phaser.Game({
  width: 800,
  height: 640,
  scene: [LoadScene],
  physics: {
    default: 'arcade'
  }
});
