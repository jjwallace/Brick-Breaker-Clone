import MenuItem from '../ui/menu.item';
import MenuConfig from '../ui/menu.config';

class MenuLevel extends Phaser.Sprite {

    constructor(game, x, y, key ) {
        super(game, x, y, key);
        this.game.stage.addChild(this);

        this.x = x;
        this.y = y;
        this.game = game; 
        this.lvlBlocks = [];
        
        //DISPLAY OUR MENU ITEMS
        var arrMax = MenuConfig.options.pageMax;
        console.log('Max Menu Items: ', arrMax);
        for(var i = 0; i < arrMax; i ++){
					
						//PLEASE MODIFY (menu.config.js)
            
            //SETUP VARS FROM CONFIG
            var currentLevel = 0; //currentLevel
            
						var tileWidth = MenuConfig.options.tileWidth
						var tileRow = MenuConfig.options.tileRow
						var tileStartY = MenuConfig.options.tileStartY
            
            var menuWidth = tileRow * tileWidth;
            var menuCenter = menuWidth / 2;
            var worldWidth = this.game.world.width;
					
            var tileStartX = (worldWidth / 2) - (menuCenter) + tileWidth / 2;
            var tileHalf = tileWidth/2;
            var myX = tileStartX + (i % tileRow) * tileWidth;
            var myY = tileStartY + Math.floor(i / tileRow) * tileWidth;
            
            this.lvlBlocks[i] = new MenuItem(this.game, myX, myY, 'lvl_sprites');
            
            //LVLS FORMAT {"name": "blank", "complete": true, "score": 3}
            //SETUP FRAME DATA BASED ON JSON DATA
            var myFrame = 0;
            if(MenuConfig.lvls.lvl[i].complete == false){ //IS LEVEL COMPLETE
                myFrame = 0;
            }else{
                myFrame = 2 + MenuConfig.lvls.lvl[i].score; //SET TO COMPLETED 
            }
            
            //SET BLOCK PROPERTIES
            this.lvlBlocks[i].frame = myFrame;
            this.lvlBlocks[i].scale.set(0);
            this.lvlBlocks[i].anchor.set(0.5);
            
        }

        //ANIMATE BLOCKS APPEAR
        for(var i = 0; i < arrMax; i ++){
            game.add.tween(this.lvlBlocks[i].scale).to( { x:1, y:1 }, 300, Phaser.Easing.Linear.None, true, i * 40);
        }

    }
}

export default MenuLevel;