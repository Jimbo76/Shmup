export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Load'
    });
  }

  init() {}

  preload() {
    this.load.spritesheet(
      'player',
      require('../assets/spritesheets/ship.png'),
      { frameWidth: 16, frameHeight: 24 }
    );
    this.load.spritesheet(
      'lasers',
      require('../assets/spritesheets/laser-bolts.png'),
      { frameWidth: 16, frameHeight: 16 }
    );
  }

  create() {
    this.scene.start('Play');
  }

  update() {}
}
