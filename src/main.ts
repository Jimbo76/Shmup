/** @type {import("../typings/phaser")} */

import { LoadScene } from './scenes/LoadScene';
// import { MenuScene } from './scenes/MenuScene';
import { PlayScene } from './scenes/PlayScene';
// import { endScene } from './scenes/endScene';
// import { CST } from './CST';

let game = new Phaser.Game({
  width: 512,
  height: 544,
  scene: [LoadScene, PlayScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
});
