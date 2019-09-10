export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Load'
    });
  }

  init() {}

  preload() {
    this.load.spritesheet({
      key: 'player',
      url: require('../assets/spritesheets/ship.png'),
      frameConfig: { 
        frameWidth: 16, 
        frameHeight: 24,
      }
    });
    this.load.spritesheet({
      key: 'lasers',
      url: require('../assets/spritesheets/laser-bolts.png'),
      frameConfig: { 
        frameWidth: 16, 
        frameHeight: 16,
        startFrame: 2,
        endFrame: 3 
      }
    });
  }

  create() {
    this.scene.start('Play');
  }

  update() {}
}
