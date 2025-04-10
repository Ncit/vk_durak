export class CancelAlertScene extends Phaser.Scene {

    constructor() {
        super('CancelAlertScene');
    }

    preload() {
        let { width, height } = this.sys.game.canvas;
        
    }

    create() {
        
    this.add.text(100, 100, 'Назад', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start("MenuScene")
        this.scene.stop("CancelAlertScene")
      } );
    }

    update() {

    }

}
