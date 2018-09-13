import MenuItem from '../ui/menu.item';
import MenuConfig from '../ui/menu.config';

import PlayController from '../controllers/play.controller';

class MenuLevel extends Phaser.Sprite {

    constructor(game, x, y, key ) {
        super(game, x, y, key);
        this.game.stage.addChild(this);
        
        var menuWidth = 380;
        var menuHeight = 400;
        
        var buttonOffset = 140;
        var starOffset = -100;

        this.x = x;
        this.y = y;
        this.game = game; 
        
        this.menu = game.add.sprite(x, y, 'ui_box');
        this.menu.anchor.set(0.5);
        this.menu.scale.set(0.5);
        game.add.tween(this.menu.scale).to( { x:1, y:1 }, 500, Phaser.Easing.Quartic.Out, true, 50);
        
        var stars = [0,0,0];
        var starCount = 3;
        var starSpacing = 104;
        var starX = x - (starSpacing);
        
        
        for(var i = 0; i < starCount; i ++){
            this.star = game.add.sprite(starX + (i * starSpacing), y + starOffset, 'star');
            this.star.anchor.set(0.5);
            this.star.scale.set(0.0);

            game.add.tween(this.star.scale).to( { x:1, y:1 }, 500, Phaser.Easing.Quartic.Out, true, 500 + 120 * i);
            stars.push(this.star)
        }
        
        this.button = game.add.sprite(x, y + buttonOffset, 'btn_next');
        this.button.anchor.set(0.5);
        this.button.scale.set(0.0);
        game.add.tween(this.button.scale).to( { x:1, y:1 }, 500, Phaser.Easing.Quartic.Out, true, 500);
        
        this.menu.inputEnabled = true;
        this.menu.events.onInputDown.add(clickNext, this);
        
        function clickNext(pointer){
            console.log(game);
            PlayController.playVars.playing = false;
            PlayController.playVars.newLevel = true;
//            
//            this.menu.destroy()
//            for(var i = 0; i < this.stars.length; i ++){
//                this.stars[i].destroy();
//            }
//            this.button.destroy()
        }
        

    }
}

export default MenuLevel;