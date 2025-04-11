let board_card_1_image
let board_card_2_image
let board_card_3_image
let board_card_4_image
let board_card_5_image

let flopCards = []
let turn_image
let river_image

let board_card_1
let board_card_2
let board_card_3
let board_card_4
let board_card_5

let timer
let currentDeck

let base_time = 20
let player_image
let player_name
let player_card_1_image
let player_card_2_image
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

let player
let enemy1
let enemy2
let enemy3
let enemy4
let players
let playersCards = []

export class RobotRoomScene extends Phaser.Scene {

    constructor() {
        super('RobotRoomScene');
    }

    preload() {
        currentDeck = new Deck();
        currentDeck.suits.forEach(suit => {
            currentDeck.values.forEach(value => {
                this.load.image(`${suit}-${value}`, `assets/${suit}-${value}.png`);
            });
        });

        let { width, height } = this.sys.game.canvas;

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
                this.scene.stop("RobotRoomScene")
            });

        this.add.text(10, 150, 'След ход', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {

                this.flop()
                this.turn()
                this.river()
                this.showDown()
            });

        this.add.text(10, 200, 'сброс', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {
                this.resetGame()
            });

        const game_table = this.add.image(game_table_x, game_table_y, 'game_table');


        this.buildPlayers()

        this.createOpponents()
        this.buildBoard()

        createPlayer(this)
        createPlayerCards(this)
        createButtons(this)
        this.createCards()
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

    buildPlayers() {
        player = new PockerPlayer("Игрок", "avatar", new PlayerCard(currentDeck.getCardFromDeck(), game_table_x - 40, game_table_y + 260), new PlayerCard(currentDeck.getCardFromDeck(), game_table_x + 40, game_table_y + 260), 2000, game_table_x, game_table_y + 120)
        enemy1 = new PockerPlayer("Противник 1", "avatar", new PlayerCard(currentDeck.getCardFromDeck(), game_table_x - 340, game_table_y + 220), new PlayerCard(currentDeck.getCardFromDeck(), game_table_x - 260, game_table_y + 220), 2000, game_table_x - 300, game_table_y + 80)
        enemy2 = new PockerPlayer("Противник 2", "avatar", new PlayerCard(currentDeck.getCardFromDeck(), game_table_x - 500, game_table_y - 160), new PlayerCard(currentDeck.getCardFromDeck(), game_table_x - 420, game_table_y - 160), 2000, game_table_x - 300, game_table_y - 160)
        enemy3 = new PockerPlayer("Противник 3", "avatar", new PlayerCard(currentDeck.getCardFromDeck(), game_table_x + 380, game_table_y - 160), new PlayerCard(currentDeck.getCardFromDeck(), game_table_x + 460, game_table_y - 160), 2000, game_table_x + 280, game_table_y - 160)
        enemy4 = new PockerPlayer("Противник 4", "avatar", new PlayerCard(currentDeck.getCardFromDeck(), game_table_x + 380, game_table_y + 80), new PlayerCard(currentDeck.getCardFromDeck(), game_table_x + 460, game_table_y + 80), 2000, game_table_x + 280, game_table_y + 80)
        players = [player, enemy1, enemy2, enemy3, enemy4]
    }

    buildBoard() {
        board_card_1 = new BoardCard(1, currentDeck.getCardFromDeck())
        board_card_2 = new BoardCard(2, currentDeck.getCardFromDeck())
        board_card_3 = new BoardCard(3, currentDeck.getCardFromDeck())
        board_card_4 = new BoardCard(4, currentDeck.getCardFromDeck())
        board_card_5 = new BoardCard(5, currentDeck.getCardFromDeck())
    }

    createCards() {
        board_card_1_image = this.add.image(board_card_1.xPosition, board_card_1.yPosition, board_card_1.cardDeck);
        board_card_2_image = this.add.image(board_card_2.xPosition, board_card_2.yPosition, board_card_2.cardDeck);
        board_card_3_image = this.add.image(board_card_3.xPosition, board_card_3.yPosition, board_card_3.cardDeck);
        board_card_4_image = this.add.image(board_card_4.xPosition, board_card_4.yPosition, board_card_4.cardDeck);
        board_card_5_image = this.add.image(board_card_5.xPosition, board_card_5.yPosition, board_card_5.cardDeck);
    }

    createOpponents() {
        enemy_1 = this.add.image(enemy1.xPosition, enemy1.yPosition, enemy1.avatar);
        enemy_1.setScale(0.8)
        this.add.text(game_table_x - 300, game_table_y + 140, enemy1.name, { fill: '#4287f5' })

        enemy_1_card_1 = this.add.image(enemy1.firstCard.xPosition, enemy1.firstCard.yPosition, 'card_back');
        enemy_1_card_1.setScale(0.8)
        enemy_1_card_2 = this.add.image(enemy1.secondCard.xPosition, enemy1.secondCard.yPosition, 'card_back');
        enemy_1_card_2.setScale(0.8)
        enemy_1_chips = this.add.text(game_table_x - 400, game_table_y + 40, enemy1.totalChips, { fill: '#ffffff' })
        enemy_1_timer = this.add.text(game_table_x - 400, game_table_y + 80, base_time, { fill: '#ffffff' })

        enemy_2 = this.add.image(enemy2.xPosition, enemy2.yPosition, enemy2.avatar);
        enemy_2.setScale(0.8)
        this.add.text(game_table_x - 300, game_table_y - 240, enemy2.name, { fill: '#4287f5' })

        enemy_2_card_1 = this.add.image(enemy2.firstCard.xPosition, enemy2.firstCard.yPosition, 'card_back');
        enemy_2_card_1.setScale(0.8)
        enemy_2_card_2 = this.add.image(enemy2.secondCard.xPosition, enemy2.secondCard.yPosition, 'card_back');
        enemy_2_card_2.setScale(0.8)
        enemy_2_chips = this.add.text(game_table_x - 200, game_table_y - 200, enemy2.totalChips, { fill: '#ffffff' })
        enemy_2_timer = this.add.text(game_table_x - 200, game_table_y - 240, base_time, { fill: '#ffffff' })

        enemy_3 = this.add.image(enemy3.xPosition, enemy3.yPosition, enemy3.avatar);
        enemy_3.setScale(0.8)
        this.add.text(game_table_x + 300, game_table_y + 140, enemy3.name, { fill: '#4287f5' })

        enemy_3_card_1 = this.add.image(enemy3.firstCard.xPosition, enemy3.firstCard.yPosition, 'card_back');
        enemy_3_card_1.setScale(0.8)
        enemy_3_card_2 = this.add.image(enemy3.secondCard.xPosition, enemy3.secondCard.yPosition, 'card_back');
        enemy_3_card_2.setScale(0.8)
        enemy_3_chips = this.add.text(game_table_x + 280, game_table_y - 260, enemy3.totalChips, { fill: '#ffffff' })
        enemy_3_timer = this.add.text(game_table_x + 280, game_table_y - 290, base_time, { fill: '#ffffff' })


        enemy_4 = this.add.image(enemy3.xPosition, enemy3.yPosition, enemy3.avatar);
        enemy_4.setScale(0.8)
        this.add.text(game_table_x + 300, game_table_y - 240, enemy3.name, { fill: '#4287f5' })

        enemy_4_card_1 = this.add.image(enemy4.firstCard.xPosition, enemy4.firstCard.yPosition, 'card_back');
        enemy_4_card_1.setScale(0.8)
        enemy_4_card_2 = this.add.image(enemy4.secondCard.xPosition, enemy4.secondCard.yPosition, 'card_back');
        enemy_4_card_2.setScale(0.8)
        enemy_4_chips = this.add.text(game_table_x + 280, game_table_y + 180, enemy4.totalChips, { fill: '#ffffff' })
        enemy_4_timer = this.add.text(game_table_x + 280, game_table_y + 200, base_time, { fill: '#ffffff' })

    }

    flop() {
        this.time.addEvent({
            delay: 100,
            loop: false,
            callback: () => {
                const flop_1_image = this.add.image(board_card_1.xPosition, board_card_1.yPosition, board_card_1.value);
                const flop_2_image = this.add.image(board_card_2.xPosition, board_card_2.yPosition, board_card_2.value);
                const flop_3_image = this.add.image(board_card_3.xPosition, board_card_3.yPosition, board_card_3.value);
                flopCards.push(flop_1_image, flop_2_image, flop_3_image)
            }
        })
    }

    turn() {
        this.time.addEvent({
            delay: 100,
            loop: false,
            callback: () => {
                turn_image = this.add.image(board_card_4.xPosition, board_card_4.yPosition, board_card_4.value);
            }
        })
    }

    river() {
        this.time.addEvent({
            delay: 100,
            loop: false,
            callback: () => {
                river_image = this.add.image(board_card_5.xPosition, board_card_5.yPosition, board_card_5.value);
            }
        })
    }

    showDown() {
        this.time.addEvent({
            delay: 100,
            loop: false,
            callback: () => {
                this.playersCardReveal()
            }
        })
    }

    playersCardReveal() {
        players.forEach((pockerPlayer) => {
            this.playerCardReveal(pockerPlayer)
        });

    }

    playerCardReveal(pockerPlayer) {
        const player_card_1 = this.add.image(pockerPlayer.firstCard.xPosition, pockerPlayer.firstCard.yPosition, pockerPlayer.firstCard.value);
        player_card_1.setScale(0.8)
        const player_card_2 = this.add.image(pockerPlayer.secondCard.xPosition, pockerPlayer.secondCard.yPosition, pockerPlayer.secondCard.value);
        player_card_2.setScale(0.8)
        playersCards.push(player_card_1, player_card_2)
    }

    resetGame() {
        playersCards.forEach(element => {
            element.destroy()
        });
        flopCards.forEach(element => {
            element.destroy()
        });
        turn_image.destroy()
        river_image.destroy()
        river_image = null
        turn_image = null
        flopCards = []
        playersCards = []

        currentDeck.resetCardDeck()
        this.buildPlayers()
        this.buildBoard()
    }
}

function createPlayerCards(scene) {
    player_card_1_image = scene.add.image(game_table_x - 40, game_table_y + 260, 'card_back');
    player_card_1_image.setScale(0.8)
    player_card_2_image = scene.add.image(game_table_x + 40, game_table_y + 260, 'card_back');
    player_card_2_image.setScale(0.8)
}

function createPlayer(scene) {
    player_image = scene.add.sprite(player.xPosition, player.yPosition, player.avatar);
    player_image.setScale(0.8)
    player_name = scene.add.text(game_table_x - 40, game_table_y + 180, player.name, { fill: '#4287f5' })
    player_chips = scene.add.text(game_table_x + 80, game_table_y + 140, player.totalChips, { fill: '#ffffff' })
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