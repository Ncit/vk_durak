export class StartScene extends Phaser.Scene {

    constructor() {
        super('StartScene');
    }

    preload() {
        let { width, height } = this.sys.game.canvas;

        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

        suits.forEach(suit => {
            values.forEach(value => {
                this.load.image(`${suit}-${value}`, `assets/${suit}-${value}.png`);
            });
        });
        this.load.image('card_back', 'assets/back.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('placeholder', 'assets/placeholder.png');
    }

    create() {

        let { width, height } = this.sys.game.canvas;

        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        this.add.text(100, 100, 'Назад', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start("MenuScene")
                this.scene.stop("FriendsScene")
            });
        const game_table = this.add.image(640, 420, 'game_table');
    }

    update() {
    }

}
