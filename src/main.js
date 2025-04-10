import { GameScene } from './scenes/GameScene.js';
import { SplashScene } from './scenes/SplashScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { FriendsScene } from './scenes/FriendsScene.js';
import { SettingsScene } from './scenes/SettingsScene.js';
import { ProfileScene } from './scenes/ProfileScene.js';
import { FriendsTableScene } from './scenes/FriendsTableScene.js';
import { CancelAlertScene } from './scenes/CancelAlertScene.js';

const config = {
    type: Phaser.AUTO,
    title: 'Техасский холдем',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#123456',
    pixelArt: false,
    scene: [
        // SplashScene, 
        // MenuScene, 
        GameScene, 
        // FriendsScene, 
        // ProfileScene, 
        // SettingsScene, 
        // FriendsTableScene, 
        // CancelAlertScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            