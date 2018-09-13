import BootState from './states/boot.state';
import PreloadState from './states/preload.state';
import MainState from './states/main.state';

class Game extends Phaser.Game {

    constructor() {
        
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            var winH = 860;
            var winW = 512;

            var aspectRatio = window.innerHeight /  window.innerWidth;
            //(window.screen.availHeight / window.screen.availWidth);

            winH = winW * aspectRatio;
            
            console.log('IS: MOBILE');
        }else{
            var winH = window.innerHeight;
            var winW = window.innerWidth;
            
            var winH = 860;
            var winW = 512;
            
            //LEGACY AUTO SIZE
            //var aspectRatio = (window.screen.availWidth / window.screen.availHeight);
            //winW = winH * aspectRatio;
            
            console.log('IS: DESKTOP');
        }

        console.log('WindowX: ' + window.innerWidth + ' WindowY: ' + + window.innerHeight);
        
        //LEGACY SCALE MODES
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.pageAlignHorizontally = true;
        //game.scale.pageAlignVertically = true;
        
        super(winW, winH, Phaser.CANVAS, '');
        
        

        this.state.add('BootState', BootState);
        this.state.add('PreloadState', PreloadState);
        this.state.add('MainState', MainState);

        this.state.start('BootState');
    }
}

new Game();