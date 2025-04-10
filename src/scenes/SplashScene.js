export class SplashScene extends Phaser.Scene {

    constructor() {
        super('SplashScene');
    }

    preload() {
        let { width, height } = this.sys.game.canvas;
        this.load.script('vklogic','./vklogic.js')
        this.load.image('start_icon', 'assets/icon.png');

        this.load.image('game_table', 'assets/table_teenpatti_normal@2x.png', { width: width / 1.5, height: height / 1.5 });
    }

    create() {
        initVkBridgeApp();
        friendsInvite();

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
            this.scene.start("MenuScene");
        }
    })
    }
    
}
