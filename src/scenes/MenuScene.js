export class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    preload() {
        let { width, height } = this.sys.game.canvas;
        
    }

    create() {
        
    const randomButton = this.add.text(100, 100, 'Случайная комната', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start("StartScene")
        this.scene.stop("MenuScene")
      } );

    const friendsTableButton = this.add.text(100, 150, 'Играть с друзьями', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start("FriendsTableScene")
        this.scene.stop("MenuScene")
        // this.scene.remove("MenuScene")
        } );

    const friendsButton = this.add.text(100, 200, 'Пригласить друзей', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start("FriendsScene")
        this.scene.stop("MenuScene")
        // this.scene.remove("MenuScene")
        } );


    const profileButton = this.add.text(100, 250, 'Профиль', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start("ProfileScene")
        this.scene.stop("MenuScene")
        // this.scene.remove("MenuScene")
        } );

    const settingsButton = this.add.text(100, 300, 'Настройки', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start("SettingsScene")
        this.scene.stop("MenuScene")
        // this.scene.remove("MenuScene")
        } );

    }

    update() {
    }

}
