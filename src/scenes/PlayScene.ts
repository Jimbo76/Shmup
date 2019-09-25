import { PlayerSprite } from '../types/PlayerSprite';
import { EnemySprite } from '../types/EnemySprite';
import { CST } from '../CST';

export class PlayScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  enemies: Phaser.Physics.Arcade.Group;
  bullets: Phaser.Physics.Arcade.Group;
  lasers: Phaser.Physics.Arcade.Group;
  bg: Phaser.GameObjects.TileSprite;

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

    this.bullets = this.physics.add.group({
      collideWorldBounds: true
    });

    this.bg = this.add
      .tileSprite(0, 0, 512, 544, 'bg')
      .setOrigin(0, 0)
      .setScale(2);
    this.player = new PlayerSprite(this, 400, 400, 'player', 2, this.lasers);
    this.enemies = this.physics.add.group();
    var enemy = new EnemySprite(this, 200, 100, 'bigEnemy', 0, this.bullets, this.player);
    this.enemies.add(enemy);

  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.enemies.children.each(function(enemy) {
      enemy.update(time, delta);
    })

    this.bg.tilePositionY -= 1;

    this.lasers.children.iterate(function(laser: Phaser.Physics.Arcade.Sprite) {
      if (laser.y === 0) {
        this.lasers.killAndHide(laser);
      }
    }, this);

    this.bullets.children.iterate(function(bullet: Phaser.Physics.Arcade.Sprite) {
      if(bullet.y >= 510) {
        this.bullets.killAndHide(bullet);
      }
    }, this);
  }
}
