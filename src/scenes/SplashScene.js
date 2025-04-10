export class SplashScene extends Phaser.Scene {

    constructor() {
        super('SplashScene');
    }

    preload() {
        this.load.image('start_icon', 'assets/icon.png');
    }

    create() {

        const start_icon = this.add.image(640, 300, 'start_icon');

        this.tweens.add({
            targets: start_icon,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });

        this.time.addEvent({
        delay: 1500,
        loop: false,
        callback: () => {
            start_icon.destroy();
            this.scene.start("StartScene");
        }
    })
    }
    
}
