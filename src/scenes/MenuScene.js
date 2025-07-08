var isDebug = true

export class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    preload() {
        let { width, height } = this.sys.game.canvas;
        this.load.script('vklogic','./src/scripts/vklogic.js')
        this.load.script('dblogic','./src/scripts/dblogic.js')
        
    }
    create() {
      prepareApp();
      // createNewGame();
//         this.time.addEvent({
//         delay: 300,
//         loop: false,
//         callback: () => {
//            loadLobby().then(function(result) {
//             gameConnection(result[0].id)
// }) 
//         }
//     })
     
        // joinGame(loadLobby().first())
//         for (let step = 0; step < 500; step++) {
//   // Runs 5 times, with values of step 0 through 4.
//   console.log("Walking east one step");
//   createNewGame();
// }

       const randomButton = this.add.text(100, 100, 'Игра с ботами', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.time.addEvent({
        delay: 1300,
        loop: false,
        callback: () => {
            
        this.scene.start("RobotRoomScene")
        this.scene.stop("MenuScene")
        }
    })
        loadLobby().then(function(result) {
            joinGame(result[0].id)
}) 
      } );

    // const friendsTableButton = this.add.text(100, 150, 'Играть с друзьями', { fill: '#0f0' })
    //   .setInteractive()
    //   .on('pointerdown', () => {
    //     this.scene.start("FriendsTableScene")
    //     this.scene.stop("MenuScene")
    //     // this.scene.remove("MenuScene")
    //     } );

    const friendsButton = this.add.text(100, 200, 'Пригласить друзей', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start("FriendsScene")
        this.scene.stop("MenuScene")
        // this.scene.remove("MenuScene")
        } );


    // const profileButton = this.add.text(100, 250, 'Профиль', { fill: '#0f0' })
    //   .setInteractive()
    //   .on('pointerdown', () => {
    //     this.scene.start("ProfileScene")
    //     this.scene.stop("MenuScene")
    //     // this.scene.remove("MenuScene")
    //     } );

    // const settingsButton = this.add.text(100, 300, 'Настройки', { fill: '#0f0' })
    //   .setInteractive()
    //   .on('pointerdown', () => {
    //     this.scene.start("SettingsScene")
    //     this.scene.stop("MenuScene")
    //     // this.scene.remove("MenuScene")
    //     } );

    }

    update() {
    }

}

function prepareApp() {
  if (isDebug) {
const newUser = {
  id: "123",
  name: "Тестовый игрок",
  lastName: "игрок2",
  avatarUrl: "https://gravatar.com/avatar/2cf48f97c5e3b33ede38271f2cc98554?s=400&d=robohash&r=x"
};  
  upsertToSupabase('players', newUser)
  .then(response => {
    // Handle success
    window.gameConfig.currentUser = response[0]
  })
  .catch(error => {
    // Handle error
    // alert("ERROR");
     console.log("---");
     console.log(error);
  });
  } else {

  setupApp(function(appData) {

          const newUser = {
  id: appData.id,
  name: appData.first_name,
  lastName: appData.last_name
};  
  upsertToSupabase('players', newUser)
  .then(response => {
    window.gameConfig.currentUser = response[0]
  })
  .catch(error => {
     console.log("---");
     console.log(error);
  });
});
  }
}