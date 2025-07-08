var isDebug = false

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
      // Set global scene reference for loading indicators
      window.currentScene = this;
      
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

            joinGame(gameId)
        this.time.addEvent({
        delay: 2800,
        loop: false,
        callback: () => {
            
        this.scene.start("RobotRoomScene")
        this.scene.stop("MenuScene")
        }
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

    // Test button for loading indicators
    // const testLoadingButton = this.add.text(100, 250, 'Test Loading System', { fill: '#ff0' })
    //   .setInteractive()
    //   .on('pointerdown', async () => {
    //     try {
    //       // Demo the different loading styles
    //       await testLoadingSystem(this);
    //     } catch (error) {
    //       console.error('Loading test failed:', error);
    //     }
    //   });


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
var gameId = null
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

        loadLobby().then(function(result) {
          gameId = result[0].id
}) 
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

        loadLobby().then(function(result) {
          gameId = result[0].id
}) 
  })
  .catch(error => {
     console.log("---");
     console.log(error);
  });
});
  }
}

// Test function to demonstrate loading system
async function testLoadingSystem(scene) {
  console.log('Testing Phaser.js Loading System...');
  
  // Test 1: Basic loader
  if (window.phaserLoader) {
    const loaderId1 = window.phaserLoader.showLoader(scene, 'Basic loading test...', {
      textColor: '#00ff00',
      spinnerColor: 0x00ff00
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    window.phaserLoader.hideLoader(loaderId1);
  }
  
  // Test 2: Progress loader
  if (window.phaserLoader) {
    const loaderId2 = window.phaserLoader.showProgressLoader(scene, 'Progress test', 0, {
      textColor: '#ffaa00',
      spinnerColor: 0xffaa00
    });
    
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 300));
      window.phaserLoader.updateProgress(loaderId2, 'Progress test', i);
    }
    
    window.phaserLoader.hideLoader(loaderId2);
  }
  
  // Test 3: Message updating loader
  if (window.phaserLoader) {
    const loaderId3 = window.phaserLoader.showLoader(scene, 'Step 1...', {
      textColor: '#ff00ff',
      spinnerColor: 0xff00ff
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.phaserLoader.updateMessage(loaderId3, 'Step 2...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.phaserLoader.updateMessage(loaderId3, 'Step 3...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.phaserLoader.updateMessage(loaderId3, 'Complete!');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    window.phaserLoader.hideLoader(loaderId3);
  }
  
  console.log('Loading system test complete!');
}