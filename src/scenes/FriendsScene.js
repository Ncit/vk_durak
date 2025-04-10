export class FriendsScene extends Phaser.Scene {

    constructor() {
        super('FriendsScene');
    }

    preload() {
        let { width, height } = this.sys.game.canvas;
        
    }

    create() {
        
    this.add.text(100, 100, 'Назад', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start("MenuScene")
        this.scene.stop("FriendsScene")
      } );

    }

    update() {
    }

}
