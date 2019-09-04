import { Scene } from 'phaser';
import { CST } from '../CST';

export class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Initialize Player
    this.setCollideWorldBounds(true);
    this.setScale(2);
    this.setOrigin(0, 0);
    this.setDrag(CST.PLAYER.DRAG);

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // Add Animations
    this.scene.anims.create({
      key: 'flyLeft',
      frames: this.scene.anims.generateFrameNumbers('player', {
        start: 0,
        end: 2,
        first: 0
      })
    });
    this.scene.anims.create({
      key: 'flyRight',
      frames: this.scene.anims.generateFrameNumbers('player', {
        start: 4,
        end: 2,
        first: 4
      })
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-CST.PLAYER.SPEED);
      this.anims.play('flyLeft');
    }
    if (this.cursors.right.isDown) {
      this.setVelocityX(CST.PLAYER.SPEED);
      this.anims.play('flyRight');
    }
  }
}
