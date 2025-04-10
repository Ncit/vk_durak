let flop_card_1
let flop_card_2
let flop_card_3
let flop_card_4
let flop_card_5

let timer

let base_time = 20
let player
let player_card_1
let player_card_2
let player_chips
let player_chips_value = 2000
let player_timer

let enemy_1
let enemy_1_card_1
let enemy_1_card_2
let enemy_1_chips
let enemy_1_chips_value = 2000
let enemy_1_timer

let enemy_2
let enemy_2_card_1
let enemy_2_card_2
let enemy_2_chips
let enemy_2_chips_value = 2000
let enemy_2_timer

let enemy_3
let enemy_3_card_1
let enemy_3_card_2
let enemy_3_chips
let enemy_3_chips_value = 2000
let enemy_3_timer

let enemy_4
let enemy_4_card_1
let enemy_4_card_2
let enemy_4_chips
let enemy_4_chips_value = 2000
let enemy_4_timer

let game_table_x = 640
let game_table_y = 320

export class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
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
        this.load.image('avatar', 'assets/avatar_placeholder.png');
        this.load.image('game_table', 'assets/table_teenpatti_normal@2x.png', { width: width / 1.5, height: height / 1.5 });
    }

    create() {

        let background = this.add.image(0, 0, 'background');

        background.setOrigin(0, 0);
        background.displayWidth = this.sys.canvas.width;
        background.displayHeight = this.sys.canvas.height;


        this.add.text(50, 50, 'В меню', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {

                this.scene.start("MenuScene")
                this.scene.stop("GameScene")
            });

        const game_table = this.add.image(game_table_x, game_table_y, 'game_table');

        createPlayerCards(this)
        createCards(this)
        createOpponents(this)
        createPlayer(this)
        createButtons(this)

        // timer = scene.time.addEvent({
        //     delay: 500,                // ms
        //     callback: {
        //         base_time -= 1;
        //     },
        //     args: [],
        //     callbackScope: {},
        //     loop: false,
        //     repeat: 0,
        //     startAt: 0,
        //     timeScale: 1,
        //     paused: false
        // });
    }

    update() {
    }

}

function createPlayerCards(scene) {
    player_card_1 = scene.add.image(game_table_x - 40, game_table_y + 260, 'card_back', { width: 14, height: 14 });
    player_card_1.setScale(0.8)
    player_card_2 = scene.add.image(game_table_x + 40, game_table_y + 260, 'card_back', { width: 14, height: 14 });
    player_card_2.setScale(0.8)
}

function createCards(scene) {

    let yPosition = game_table_y - 20
    let xPosition = game_table_x - 200

    flop_card_1 = scene.add.image(xPosition, yPosition, 'card_back', { width: 14, height: 14 });

    xPosition += 100

    flop_card_2 = scene.add.image(xPosition, yPosition, 'card_back', { width: 14, height: 14 });

    xPosition += 100

    flop_card_3 = scene.add.image(xPosition, yPosition, 'card_back', { width: 14, height: 14 });

    xPosition += 100

    flop_card_4 = scene.add.image(xPosition, yPosition, 'card_back', { width: 14, height: 14 });

    xPosition += 100

    flop_card_5 = scene.add.image(xPosition, yPosition, 'card_back', { width: 14, height: 14 });

}

function createOpponents(scene) {
    enemy_1 = scene.add.image(game_table_x - 300, game_table_y + 80, 'avatar', { width: 14, height: 14 });
    enemy_1.setScale(0.2)
    scene.add.text(game_table_x - 300, game_table_y + 140, 'Противник 1', { fill: '#4287f5' })

    enemy_1_card_1 = scene.add.image(game_table_x - 340, game_table_y + 220, 'card_back', { width: 14, height: 14 });
    enemy_1_card_1.setScale(0.8)
    enemy_1_card_2 = scene.add.image(game_table_x - 260, game_table_y + 220, 'card_back', { width: 14, height: 14 });
    enemy_1_card_2.setScale(0.8)
    enemy_1_chips = scene.add.text(game_table_x - 400, game_table_y + 40, enemy_1_chips_value, { fill: '#ffffff' })
    enemy_1_timer = scene.add.text(game_table_x - 400, game_table_y + 80, base_time, { fill: '#ffffff' })

    enemy_2 = scene.add.image(game_table_x - 300, game_table_y - 160, 'avatar', { width: 14, height: 14 });
    enemy_2.setScale(0.2)
    scene.add.text(game_table_x - 300, game_table_y - 240, 'Противник 2', { fill: '#4287f5' })

    enemy_2_card_1 = scene.add.image(game_table_x - 500, game_table_y - 160, 'card_back', { width: 14, height: 14 });
    enemy_2_card_1.setScale(0.8)
    enemy_2_card_2 = scene.add.image(game_table_x - 420, game_table_y - 160, 'card_back', { width: 14, height: 14 });
    enemy_2_card_2.setScale(0.8)
    enemy_2_chips = scene.add.text(game_table_x - 200, game_table_y - 200, enemy_2_chips_value, { fill: '#ffffff' })
    enemy_2_timer = scene.add.text(game_table_x - 200, game_table_y - 240, base_time, { fill: '#ffffff' })


    enemy_3 = scene.add.image(game_table_x + 280, game_table_y - 160, 'avatar', { width: 14, height: 14 });
    enemy_3.setScale(0.2)
    scene.add.text(game_table_x + 300, game_table_y + 140, 'Противник 3', { fill: '#4287f5' })

    enemy_3_card_1 = scene.add.image(game_table_x + 380, game_table_y - 160, 'card_back', { width: 14, height: 14 });
    enemy_3_card_1.setScale(0.8)
    enemy_3_card_2 = scene.add.image(game_table_x + 460, game_table_y - 160, 'card_back', { width: 14, height: 14 });
    enemy_3_card_2.setScale(0.8)
    enemy_3_chips = scene.add.text(game_table_x + 280, game_table_y - 260, enemy_2_chips_value, { fill: '#ffffff' })
    enemy_3_timer = scene.add.text(game_table_x + 280, game_table_y - 290, base_time, { fill: '#ffffff' })


    enemy_4 = scene.add.image(game_table_x + 280, game_table_y + 80, 'avatar', { width: 14, height: 14 });
    enemy_4.setScale(0.2)
    scene.add.text(game_table_x + 300, game_table_y - 240, 'Противник 4', { fill: '#4287f5' })

    enemy_4_card_1 = scene.add.image(game_table_x + 380, game_table_y + 80, 'card_back', { width: 14, height: 14 });
    enemy_4_card_1.setScale(0.8)
    enemy_4_card_2 = scene.add.image(game_table_x + 460, game_table_y + 80, 'card_back', { width: 14, height: 14 });
    enemy_4_card_2.setScale(0.8)
    enemy_4_chips = scene.add.text(game_table_x + 280, game_table_y + 180, enemy_2_chips_value, { fill: '#ffffff' })
    enemy_4_timer = scene.add.text(game_table_x + 280, game_table_y + 200, base_time, { fill: '#ffffff' })

}

function createPlayer(scene) {
    player = scene.add.sprite(game_table_x, game_table_y + 120, 'avatar', { width: 14, height: 14 });
    player.setScale(0.2)
    scene.add.text(game_table_x - 40, game_table_y + 180, 'Имя игрока', { fill: '#4287f5' })
    player_chips = scene.add.text(game_table_x + 80, game_table_y + 140, player_chips_value, { fill: '#ffffff' })
    player_timer = scene.add.text(game_table_x + 80, game_table_y + 160, base_time, { fill: '#ffffff' })
}

function createButtons(scene) {
    let yPosition = 660
    let xPosition = 400

    const foldButton = scene.add.text(xPosition, yPosition, 'Сбросить', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => {
        });
    xPosition = xPosition + foldButton.width + 40
    const callButton = scene.add.text(xPosition, yPosition, 'Ответить', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => {
        });

    xPosition = xPosition + callButton.width + 40

    const skipButton = scene.add.text(xPosition, yPosition, 'Пропустить', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => {
        });

    xPosition = xPosition + skipButton.width + 40

    const raiseButton = scene.add.text(xPosition, yPosition, 'Поднять', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => {
        });
}