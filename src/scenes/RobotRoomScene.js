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
        // Set global scene reference for loading indicators
        window.currentScene = this;
// this.time.addEvent({
//         delay: 1700,
//         loop: false,
//         callback: () => {
//         startHeartbeat();
            
//         }
//     })
        
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


        // Load multiplayer data if available
        this.loadMultiplayerData();

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
        // Clear any existing players
        players = [];
        
        // Define seat positions around the table
        const seatPositions = [
            { x: game_table_x, y: game_table_y + 120, cardX1: game_table_x - 40, cardY1: game_table_y + 260, cardX2: game_table_x + 40, cardY2: game_table_y + 260 }, // Bottom (current player)
            { x: game_table_x - 300, y: game_table_y + 80, cardX1: game_table_x - 340, cardY1: game_table_y + 220, cardX2: game_table_x - 260, cardY2: game_table_y + 220 }, // Bottom-left
            { x: game_table_x - 300, y: game_table_y - 160, cardX1: game_table_x - 500, cardY1: game_table_y - 160, cardX2: game_table_x - 420, cardY2: game_table_y - 160 }, // Top-left
            { x: game_table_x + 280, y: game_table_y - 160, cardX1: game_table_x + 380, cardY1: game_table_y - 160, cardX2: game_table_x + 460, cardY2: game_table_y - 160 }, // Top-right
            { x: game_table_x + 280, y: game_table_y + 80, cardX1: game_table_x + 380, cardY1: game_table_y + 80, cardX2: game_table_x + 460, cardY2: game_table_y + 80 }  // Bottom-right
        ];
        
        // Use real multiplayer data if available
        if (window.gameConfig && window.gameConfig.players && window.gameConfig.players.length > 0) {
            console.log("Building players from multiplayer data:", window.gameConfig.players);
            
            window.gameConfig.players.forEach((dbPlayer, index) => {
                if (index < seatPositions.length) {
                    const seat = seatPositions[index];
                    const playerName = dbPlayer.player ? dbPlayer.player.name : `Player ${dbPlayer.player_id}`;
                    const chips = dbPlayer.chips || 2000;
                    
                    const pockerPlayer = new PockerPlayer(
                        playerName,
                        "avatar",
                        new PlayerCard(currentDeck.getCardFromDeck(), seat.cardX1, seat.cardY1),
                        new PlayerCard(currentDeck.getCardFromDeck(), seat.cardX2, seat.cardY2),
                        chips,
                        seat.x,
                        seat.y
                    );
                    
                    // Mark current user
                    pockerPlayer.isCurrentPlayer = (dbPlayer.player_id === window.gameConfig.currentUser?.id);
                    pockerPlayer.playerId = dbPlayer.player_id;
                    pockerPlayer.dbData = dbPlayer;
                    
                    players.push(pockerPlayer);
                }
            });
        } else {
            // Fallback to single player if no multiplayer data
            console.log("No multiplayer data, creating single player");
            const seat = seatPositions[0];
            player = new PockerPlayer(
                "Игрок", 
                "avatar", 
                new PlayerCard(currentDeck.getCardFromDeck(), seat.cardX1, seat.cardY1), 
                new PlayerCard(currentDeck.getCardFromDeck(), seat.cardX2, seat.cardY2), 
                2000, 
                seat.x, 
                seat.y
            );
            player.isCurrentPlayer = true;
            players = [player];
        }
        
        console.log("Built players:", players);
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
        // Clear any existing player UI elements
        this.clearPlayerUI();
        
        console.log("Creating opponents for players:", players);
        
        // Dynamic text positioning based on seat
        const textPositions = [
            { nameX: game_table_x - 40, nameY: game_table_y + 180, chipsX: game_table_x + 80, chipsY: game_table_y + 140, timerX: game_table_x + 80, timerY: game_table_y + 160 }, // Bottom (current player)
            { nameX: game_table_x - 300, nameY: game_table_y + 140, chipsX: game_table_x - 400, chipsY: game_table_y + 40, timerX: game_table_x - 400, timerY: game_table_y + 80 }, // Bottom-left
            { nameX: game_table_x - 300, nameY: game_table_y - 240, chipsX: game_table_x - 200, chipsY: game_table_y - 200, timerX: game_table_x - 200, timerY: game_table_y - 240 }, // Top-left
            { nameX: game_table_x + 300, nameY: game_table_y + 140, chipsX: game_table_x + 280, chipsY: game_table_y - 260, timerX: game_table_x + 280, timerY: game_table_y - 290 }, // Top-right
            { nameX: game_table_x + 300, nameY: game_table_y - 240, chipsX: game_table_x + 280, chipsY: game_table_y + 180, timerX: game_table_x + 280, timerY: game_table_y + 200 }  // Bottom-right
        ];
        
        players.forEach((player, index) => {
            if (index < textPositions.length) {
                const textPos = textPositions[index];
                
                // Create player avatar
                const avatar = this.add.image(player.xPosition, player.yPosition, player.avatar);
                avatar.setScale(0.8);
                
                // Highlight current player differently
                if (player.isCurrentPlayer) {
                    avatar.setTint(0x88ff88); // Green tint for current player
                }
                
                // Create player name
                const nameText = this.add.text(textPos.nameX, textPos.nameY, player.name, { 
                    fill: player.isCurrentPlayer ? '#88ff88' : '#4287f5',
                    fontSize: '16px'
                });
                
                // Create cards (hidden for other players, visible for current player)
                let card1, card2;
                if (player.isCurrentPlayer) {
                    // Show actual cards for current player
                    card1 = this.add.image(player.firstCard.xPosition, player.firstCard.yPosition, player.firstCard.value || 'card_back');
                    card2 = this.add.image(player.secondCard.xPosition, player.secondCard.yPosition, player.secondCard.value || 'card_back');
                } else {
                    // Show card backs for other players
                    card1 = this.add.image(player.firstCard.xPosition, player.firstCard.yPosition, 'card_back');
                    card2 = this.add.image(player.secondCard.xPosition, player.secondCard.yPosition, 'card_back');
                }
                card1.setScale(0.8);
                card2.setScale(0.8);
                
                // Create chips display
                const chipsText = this.add.text(textPos.chipsX, textPos.chipsY, player.totalChips, { 
                    fill: '#ffffff',
                    fontSize: '14px'
                });
                
                // Create timer display
                const timerText = this.add.text(textPos.timerX, textPos.timerY, base_time, { 
                    fill: '#ffffff',
                    fontSize: '12px'
                });
                
                // Store references for later updates
                player.uiElements = {
                    avatar: avatar,
                    nameText: nameText,
                    card1: card1,
                    card2: card2,
                    chipsText: chipsText,
                    timerText: timerText
                };
            }
        });
    }
    
    clearPlayerUI() {
        // Clear any existing UI elements
        players.forEach(player => {
            if (player.uiElements) {
                Object.values(player.uiElements).forEach(element => {
                    if (element && element.destroy) {
                        element.destroy();
                    }
                });
                player.uiElements = null;
            }
        });
    }
    
    refreshPlayers() {
        console.log("Refreshing multiplayer players display");
        this.buildPlayers();
        this.createOpponents();
    }
    
    async loadMultiplayerData() {
        // Load current game and players if we have game data
        if (window.gameConfig && window.gameConfig.currentGame?.id) {
            console.log("Loading multiplayer data for game:", window.gameConfig.currentGame.id);
            
            try {
                // Load players for current game
                await loadPlayers(window.gameConfig.currentGame.id);
                
                // Setup real-time subscriptions for player updates
                setupGameSubscriptions(window.gameConfig.currentGame.id);
                
                // Load current game state
                await loadGameState(window.gameConfig.currentGame.id);
                
                console.log("Multiplayer data loaded successfully");
            } catch (error) {
                console.error("Error loading multiplayer data:", error);
            }
        } else {
            console.log("No active game found, running in single player mode");
        }
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
        if (turn_image) turn_image.destroy()
        if (river_image) river_image.destroy()
        river_image = null
        turn_image = null
        flopCards = []
        playersCards = []

        currentDeck.resetCardDeck()
        this.refreshPlayers()  // Use refreshPlayers to rebuild with current multiplayer data
        this.buildBoard()
    }
}

function createPlayerCards(scene) {
    // Find current player from multiplayer data
    const currentPlayer = players.find(p => p.isCurrentPlayer) || players[0];
    
    if (currentPlayer) {
        player_card_1_image = scene.add.image(currentPlayer.firstCard.xPosition, currentPlayer.firstCard.yPosition, 'card_back');
        player_card_1_image.setScale(0.8)
        player_card_2_image = scene.add.image(currentPlayer.secondCard.xPosition, currentPlayer.secondCard.yPosition, 'card_back');
        player_card_2_image.setScale(0.8)
    } else {
        // Fallback to default positions
        player_card_1_image = scene.add.image(game_table_x - 40, game_table_y + 260, 'card_back');
        player_card_1_image.setScale(0.8)
        player_card_2_image = scene.add.image(game_table_x + 40, game_table_y + 260, 'card_back');
        player_card_2_image.setScale(0.8)
    }
}

function createPlayer(scene) {
    // Find current player from multiplayer data
    const currentPlayer = players.find(p => p.isCurrentPlayer) || players[0];
    
    if (currentPlayer) {
        player_image = scene.add.sprite(currentPlayer.xPosition, currentPlayer.yPosition, currentPlayer.avatar);
        player_image.setScale(0.8)
        player_name = scene.add.text(game_table_x - 40, game_table_y + 180, currentPlayer.name, { fill: '#88ff88' })
        player_chips = scene.add.text(game_table_x + 80, game_table_y + 140, currentPlayer.totalChips, { fill: '#ffffff' })
        player_timer = scene.add.text(game_table_x + 80, game_table_y + 160, base_time, { fill: '#ffffff' })
        
        // Set global player reference for compatibility
        player = currentPlayer;
    }
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