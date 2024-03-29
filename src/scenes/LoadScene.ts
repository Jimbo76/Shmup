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
        frameHeight: 24
      }
    });
    this.load.spritesheet({
      key: 'bigEnemy',
      url: require('../assets/spritesheets/enemy-big.png'),
      frameConfig: {
        frameWidth: 32,
        frameHeight: 32
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
    this.load.spritesheet({
      key: 'bullets',
      url: require('../assets/spritesheets/laser-bolts.png'),
      frameConfig: {
        frameWidth: 16,
        frameHeight: 16,
        startFrame: 0,
        endFrame: 1
      }
    });
    this.load.image({
      key: 'bg',
      url: require('../assets/backgrounds/desert-background.png')
    });
  }

  create() {
    this.scene.start('Play');
  }

  update() {}
}
