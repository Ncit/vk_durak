import { StartScene } from './scenes/StartScene.js';
import { SplashScene } from './scenes/SplashScene.js';

const config = {
    type: Phaser.AUTO,
    title: 'Техасский холдем',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        SplashScene, StartScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            