import { Scene } from 'phaser';
import { CST } from '../CST';

export class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  fireButton: Phaser.Input.Keyboard.Key;
  lasers: Phaser.Physics.Arcade.Group;
  laserGate: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: number,
    lasers: Phaser.Physics.Arcade.Group
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Initialize Player
    this.setCollideWorldBounds(true);
    this.setScale(2);
    this.setOrigin(0.5, 0);
    this.setDrag(CST.PLAYER.DRAG);

    //@ts-ignore
    this.body.onWorldBounds = true;

    this.lasers = lasers;
    this.laserGate = 0;

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.fireButton = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Add Animations
    this.scene.anims.create({
      key: 'flyLeft',
      frames: this.scene.anims.generateFrameNumbers('player', {
        start: 0,
        end: 2,
        first: 0
      }),
      frameRate: 10
    });
    this.scene.anims.create({
      key: 'flyRight',
      frames: this.scene.anims.generateFrameNumbers('player', {
        start: 4,
        end: 2,
        first: 4
      }),
      frameRate: 10
    });
    this.scene.anims.create({
      key: 'fire',
      frames: this.scene.anims.generateFrameNumbers('lasers', {
        start: 2,
        end: 3
      }),
      repeat: -1,
      frameRate: 10
    });
  }

  update(time: number, delta: number) {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-CST.PLAYER.SPEED);
      this.anims.play('flyLeft');
    }
    if (this.cursors.right.isDown) {
      this.setVelocityX(CST.PLAYER.SPEED);
      this.anims.play('flyRight');
    }
    if (this.fireButton.isDown) {
      this.fire(time);
    }
  }

  fire(time: number) {
    if (time > this.laserGate) {
      console.log('Total lasers = ' + this.lasers.getLength());

      let laser: Phaser.Physics.Arcade.Sprite = this.lasers.getFirstDead();

      if (laser) {
        console.log('Reviving laser!');
        laser.x = this.x;
        laser.y = this.y;
        laser.setVelocityY(CST.LASER.SPEED);
        laser.setActive(true);
        laser.setVisible(true);
      } else {
        console.log('Creating new laser!');
        laser = this.lasers.create(this.x, this.y, 'lasers');
        laser.setScale(2);
        laser.setOrigin(0.5, 0);
        laser.anims.play('fire');
      }

      this.laserGate = time + CST.LASER.INTERVAL;
    }
  }
}
