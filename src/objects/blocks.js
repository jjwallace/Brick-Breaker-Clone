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
            
            var myY = 16 + Math.floor(i / 16) * 32;
            var myX = 16 + (i % 16) * 32;
            
            if(jsonData.layers[0].data[i] == 0){
                this.blocks[i] = new Block(this.game, myX, myY, 'blank', 10, 1, i);
                //this.blocks[i].destroyMe();
                this.blocks[i].destroy();
            }else{
                var blockType = jsonData.layers[0].data[i]-1;
                this.blocks[i] = new Block(this.game, myX, myY, 'blocks', 10, blockType, i);
                this.blocks[i].frame = blockType;
                this.blocks[i].scale.set(0.5);
            }
        }
        
        for(var i = 0; i < this.blocks.length; i ++){
            game.add.tween(this.blocks[i].scale).to( { x:1, y:1 }, 200, Phaser.Easing.Linear.None, true, i + 100);
        }
        
    }

    update(){
//        if(this.game.blockGroup.countLiving() == 1){
//            console.log('GAME COMPLETE');
//            this.destroy();
//        }
    }
    
    render(){
        
        this.game.debug.start(20, 20, 'blue');
        this.game.debug.line();
        this.game.debug.line('BLOCK COUNT:', this.game.blockGroup.countLiving());
        this.game.debug.line( 'BALL COUNT:', this.game.ballGroup.countLiving());
        this.game.debug.stop();
//        game.debug.text( 'BLOCK COUNT:', this.game.blockGroup.countLiving(), 10, 20 );
//        game.debug.text( 'BALL COUNT:', this.game.ballGroup.countLiving(), 10, 250 );

    }

}

export default Blocks;