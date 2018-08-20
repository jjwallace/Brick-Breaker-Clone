import DragObj from '../objects/drag.obj';
import Block from '../objects/block';
import Blocks from '../objects/blocks';
import Burst from '../objects/burst';

import PlayController from '../controllers/play.controller';

class MainState extends Phaser.State {

    create() {
        this.levelNum = 0;
        this.level = 'lvl' + this.levelNum;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
			
				this.game.rayGroup = this.game.add.group();
			
        this.game.ballGroup = this.game.add.group();
        this.game.blockGroup = this.game.add.group();
				
				this.game.miscGroup = this.game.add.group();
				
        //this.game.physics.arcade.gravity.y = 100;
        
				//this.game.ballGroup.rayGroup = true;
        
        this.game.blockGroup.enableBody = true;
        this.game.ballGroup.enableBody = true;
        
				this.game.physics.arcade.enable(this.game.rayGroup);
        this.game.physics.arcade.enable(this.game.ballGroup);
        this.game.physics.arcade.enable(this.game.blockGroup);
        
        this.myblocks = new Blocks(this.game, this.game.world.centerX, this.game.world.centerY, 'blank', this.level);
			
        var dragObject = new DragObj(this.game, this.game.world.centerX, this.game.world.height);
        
    }
    
    update(){
        
        var ballHitBrick = function(ball, brick) {
            
            brick.health -= 1;
            brick.boomMe();
            brick.text.setText(brick.health);

            if(brick.health <= 0){
                //console.log('BLOCKS TOTAL: ' + this.game.blockGroup.countLiving() + ' | Block ' + brick.id + ' Destroyed X:' + brick.x + ' Y:' + brick.y);
                
                new Burst(brick.game, brick.x, brick.y, 'boom');
                brick.text.setText('');
                brick.sfxBoom.play();
                brick.destroy();

            }else{
                brick.sfxHit.play();
            }
            
            if(this.game.blockGroup.countLiving() == 0){
                console.log('GAME COMPLETE');
                this.myblocks.destroy();
                
            }

        }.bind(this);
        
        function ballOutOfPlay(ball, brick) {
            ball.destroy();
        }
        
        if(this.game.blockGroup.countLiving() == 0  && this.game.ballGroup.countLiving() == 0){
            this.levelNum ++;
            this.level = 'lvl' + this.levelNum;

            //this.game.ballGroup.forEach(function (c) {c.destroy(); });
            this.myblocks = new Blocks(this.game, this.game.world.centerX, this.game.world.centerY, 'blank', this.level);
        }
        
        //this.game.physics.arcade.collide(this.game.ballGroup, this.game.uiBottom, ballOutOfPlay);
        
        this.game.physics.arcade.collide(this.game.rayGroup, this.game.blockGroup);
        
        //TURN ON AND OFF BALL / BLOCK COLLISION WHEN ASKING BALLS TO RETURN
        if(PlayController.playVars.returnBalls == false){
            this.game.physics.arcade.collide(this.game.ballGroup, this.game.blockGroup, ballHitBrick);
        }
    }

}

export default MainState;