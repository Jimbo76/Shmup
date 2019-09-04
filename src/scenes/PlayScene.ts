import { PlayerSprite } from '../types/PlayerSprite';
import { CST } from '../CST';

export class PlayScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: 'Play'
    });
  }

  init() {}

  preload() {}

  create() {
    this.player = new PlayerSprite(this, 400, 400, 'player', 2);
  }

  update() {

    this.player.update();

  }
}
