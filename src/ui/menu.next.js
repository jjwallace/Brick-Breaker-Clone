import MenuItem from '../ui/menu.item';
import MenuConfig from '../ui/menu.config';

import PlayController from '../controllers/play.controller';

class MenuNext extends Phaser.Sprite {

    constructor(game, x, y, key ) {
        super(game, x, y, key);
        this.game.stage.addChild(this);
        
        this.game.menuNextGroup = this.game.add.group();
        
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
        this.game.menuNextGroup.add(this.menu);
        
        var stars = [0,0,0];
        var darkStars = [];
        var starCount = 3;
        var starSpacing = 104;
        var starX = x - (starSpacing);
        
        for(var i = 0; i < starCount; i ++){
            this.star = game.add.sprite(starX + (i * starSpacing), y + starOffset, 'star');
            this.star.anchor.set(0.5);
            this.star.scale.set(0.0);
            this.game.menuNextGroup.add(this.star);
            
            this.darkStar = game.add.sprite(starX + (i * starSpacing), y + starOffset, 'star');
            this.darkStar.anchor.set(0.5);
            this.darkStar.tint = Math.random() * 0xffffff;
            this.addChild(this.darkStar);
            stars.push(this.star)

            game.add.tween(this.star.scale).to( { x:1, y:1 }, 500, Phaser.Easing.Elastic.Out, true, 700 + (300 * i));
            stars.push(this.star)
        }
        this.lvl = PlayController.playVars.level+1;
        this.message = "Level " + this.lvl + ' Complete'
        
        var style = { font: "32px Arial", fill: "#666666", align: "center", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = game.add.text(0, 0, this.message, style);
        this.text.stroke = '#eeeeee';
        this.text.strokeThickness = 4;
        this.text.setTextBounds(-150, 0, 300, 100);
        this.text.scale.set(0.0);
        game.add.tween(this.text.scale).to( { x:1, y:1 }, 500, Phaser.Easing.Elastic.Out, true, 500);
        this.addChild(this.text);
        
        this.button = game.add.sprite(x, y + buttonOffset, 'btn_next');
        this.button.anchor.set(0.5);
        this.button.scale.set(0.0,1);
        this.game.menuNextGroup.add(this.button);
        
        game.add.tween(this.button.scale).to( { x:1, y:1 }, 500, Phaser.Easing.Quartic.Out, true, 1500);
        
        this.menu.inputEnabled = true;
        this.menu.events.onInputDown.add(clickNext, this);
        
        function clickNext(pointer){
            console.log(game);
            PlayController.playVars.playing = false;
            PlayController.playVars.newLevel = true;
            
//            game.add.tween(this.button.scale).to( { x:0, y:0 }, 200, Phaser.Easing.Quartic.Out, true, 0);
//            
//            game.add.tween(this.menu.scale).to( { x:0, y:0 }, 500, Phaser.Easing.Quartic.Out, true, 0);
//            
//            for(var i = 0; i < this.stars.length; i ++){
//                game.add.tween(this.stars[i].scale).to( { x:0, y:0 }, 200, Phaser.Easing.Quartic.Out, true, 0);
//            }
            console.log(this)
            
            this.destroy();
            game.menuNextGroup.destroy();

        }
        

    }
}

export default MenuNext;