export class SplashScene extends Phaser.Scene {

    constructor() {
        super('SplashScene');
    }

    preload() {
        let { width, height } = this.sys.game.canvas;
        this.load.script('player_card', './src/scripts/domain/PlayerCard.js')
        this.load.script('board_card', './src/scripts/domain/BoardCard.js')
        this.load.script('pocker_player', './src/scripts/domain/PockerPlayer.js')
        this.load.script('deck', './src/scripts/domain/Deck.js')
        this.load.script('vklogic','./src/scripts/vklogic.js')
        this.load.image('start_icon', 'assets/icon.png');

        this.load.image('game_table', 'assets/table_teenpatti_normal@2x.png', { width: width / 1.5, height: height / 1.5 });
    }

    create() {
        initVkBridgeApp();

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
        delay: 100,
        loop: false,
        callback: () => {
            start_icon.destroy();
            // this.scene.start("MenuScene");
            this.scene.start("RobotRoomScene");
        }
    })
    }
    
}
