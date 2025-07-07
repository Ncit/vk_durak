export class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    preload() {
        let { width, height } = this.sys.game.canvas;
        this.load.script('vklogic','./src/scripts/vklogic.js')
        this.load.script('bdlogic','./src/scripts/bdlogic.js')
        
    }

    create() {
        setupApp(function(appData) {
    console.log(appData)
          // auth(appData)
//           const newUser = {
//   id: appData.data.id,
//   name: appData.data.first_name,
//   lastName: appData.data.last_name
// };
  //         saveToSupabase('users', newUser)
  // .then(response => {
  //   // Handle success
  //   alert("SUCCESS");
  // })
  // .catch(error => {
  //   // Handle error
  //   alert("ERROR");
  // });
});
       const randomButton = this.add.text(100, 100, 'Игра с ботами', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start("RobotRoomScene")
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
