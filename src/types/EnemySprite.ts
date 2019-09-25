import { Scene } from 'phaser';
import { CST } from '../CST';
import { SSL_OP_LEGACY_SERVER_CONNECT } from 'constants';

export class EnemySprite extends Phaser.Physics.Arcade.Sprite {
  bouncetick: number = 0;
  bulletGate: number;
  bullets: Phaser.Physics.Arcade.Group;
  player: Phaser.Physics.Arcade.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: number,
    bullets: Phaser.Physics.Arcade.Group,
    player: Phaser.Physics.Arcade.Sprite
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2);
    this.setOrigin(0.5, 0.7);

    this.bullets = bullets;
    this.player = player;
    this.bulletGate = 0;

    // Add Animations
    this.scene.anims.create({
      key: 'fly',
      frames: this.scene.anims.generateFrameNumbers('bigEnemy', {
        frames: [0, 0, 1, 1]
      }),
      frameRate: 20,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'enemyFire',
      frames: this.scene.anims.generateFrameNumbers('bullets', {
        frames: [0, 0, 1, 1]
      }),
      repeat: -1,
      frameRate: 20
    });

    this.anims.play('fly');
  }

  update(time: number, delta: number) {
    this.bouncetick += 0.02;
    this.x += Math.sin(this.bouncetick) * 1;

    if(time > this.bulletGate) {
      this.fire();
      this.bulletGate = time + CST.BULLET.INTERVAL;
    }
  }

  fire() {

    let bullet: Phaser.Physics.Arcade.Sprite = this.bullets.getFirstDead();

    if(bullet) {
      console.log('Reviving Bullet!');
      bullet.x = this.x;
      bullet.y = this.y;
      bullet.setActive(true);
      bullet.setVisible(true);
    } else {
      console.log('Creating New Bullet!');
      bullet = this.bullets.create(this.x, this.y, 'bullets');
      bullet.setScale(2);
      bullet.setOrigin(0.5, 0);
      bullet.anims.play('enemyFire');
    }

    this.scene.physics.moveToObject(bullet, this.player, CST.BULLET.SPEED);

  }
}
