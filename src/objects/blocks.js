import Block from '../objects/block';

class Blocks extends Phaser.Sprite {

    constructor(game, x, y, key, level) {
        super(game, x, y, key);
        this.game.stage.addChild(this);

        this.x = x;
        this.y = y;

        this.blocks = [];
        this.level = level;
        
        var jsonData = this.game.cache.getJSON(this.level);
        
        console.log("LEVEL JSON LOADED:");
        console.log(jsonData);
        
        for(var i = 0; i < jsonData.layers[0].data.length; i ++){
            
            var tileWidth = 32
            var tileHalf = tileWidth/2;

            var myY = tileHalf + Math.floor(i / tileHalf) * tileWidth;
            var myX = tileHalf + (i % tileHalf) * tileWidth;
            
            if(jsonData.layers[0].data[i] == 0){
                this.blocks[i] = new Block(this.game, myX, myY, 'blank', 10, 1, i);
                this.blocks[i].destroy();
            }else{
                var blockType = jsonData.layers[0].data[i]-1;
                this.blocks[i] = new Block(this.game, myX, myY, 'blocks', 1 + blockType * 2, blockType, i);
                this.blocks[i].frame = blockType;
                this.blocks[i].scale.set(0);
            }
        }
        
        for(var i = 0; i < this.blocks.length; i ++){
            game.add.tween(this.blocks[i].scale).to( { x:1, y:1 }, 200, Phaser.Easing.Linear.None, true, i + 100);
        }
        
    }
    
}

export default Blocks;