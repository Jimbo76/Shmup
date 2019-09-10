import { PlayerSprite } from '../types/PlayerSprite';
import { CST } from '../CST';

export class PlayScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  lasers: Phaser.Physics.Arcade.Group;

  constructor() {
    super({
      key: 'Play'
    });
  }

  init() {}

  preload() {}

  create() {
    this.lasers = this.physics.add.group({
      velocityY: CST.LASER.SPEED,
      collideWorldBounds: true
    });
    this.player = new PlayerSprite(this, 400, 400, 'player', 2, this.lasers);

  }

  update(time: number, delta: number) {
    
    this.player.update(time, delta);

    this.lasers.children.iterate(function (laser: Phaser.Physics.Arcade.Sprite) {
      if(laser.y === 0) {
        this.lasers.killAndHide(laser);
      }
    }, this)
  }

}
