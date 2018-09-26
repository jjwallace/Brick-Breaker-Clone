import PlayObj from '../objects/play';
import Block from '../objects/block';
import Blocks from '../objects/blocks';
import Burst from '../objects/burst';

import PlayController from '../controllers/play.controller';

//import MenuLevel from '../ui/menu.level';
import MenuNext from '../ui/menu.next';

class MainState extends Phaser.State {

    create() {
        
        this.level = 'lvl' + PlayController.playVars.level;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
			
				this.game.rayGroup = this.game.add.group();
			
        this.game.ballGroup = this.game.add.group();
        this.game.blockGroup = this.game.add.group();
				
				this.game.miscGroup = this.game.add.group();

        
        this.game.blockGroup.enableBody = true;
        this.game.ballGroup.enableBody = true;
        
				this.game.physics.arcade.enable(this.game.rayGroup);
        this.game.physics.arcade.enable(this.game.ballGroup);
        this.game.physics.arcade.enable(this.game.blockGroup);
        
        this.myblocks = new Blocks(this.game, this.game.world.centerX, this.game.world.centerY, 'blank', this.level);
			
        var dragObject = new PlayObj(this.game, this.game.world.centerX, this.game.world.height);
        
        //var lvlMenu = new MenuLevel(this.game, this.game.world.centerX, this.game.world.centerY, 'blank');
        
        //this.interLevelMenu = new MenuNext(this.game, this.game.world.centerX, this.game.world.centerY, 'blank');
    }
    
    update(){
        
        var ballHitBrick = function(ball, brick) {
            
            brick.health -= 1;
            brick.boomMe();
            brick.text.setText(brick.health);

            if(brick.health <= 0){
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

            if(PlayController.playVars.playing){
                this.interLevelMenu = new MenuNext(this.game, this.game.world.centerX, this.game.world.centerY, 'blank');
                PlayController.playVars.playing = false;
                this.playing = false;
            }
        }
        
        this.playing = PlayController.playVars.playing;
        this.newLevel = PlayController.playVars.newLevel;
        
        if(this.playing == false && this.newLevel == true){
            PlayController.playVars.level ++;
            this.level = 'lvl' + PlayController.playVars.level;

            this.myblocks = new Blocks(this.game, this.game.world.centerX, this.game.world.centerY, 'blank', this.level);
            
            this.playing = true;
            PlayController.playVars.playing = true;
            PlayController.playVars.newLevel = false;
            
            //this.interLevelMenu.destroy();
        }
        
        this.game.physics.arcade.collide(this.game.rayGroup, this.game.blockGroup);
        
        //TURN ON AND OFF BALL / BLOCK COLLISION WHEN ASKING BALLS TO RETURN
        if(PlayController.playVars.returnBalls == false){
            this.game.physics.arcade.collide(this.game.ballGroup, this.game.blockGroup, ballHitBrick);
        }
    }
    
    nextLevel(){
        this.PlayController.playVars.level ++;
        this.level = 'lvl' + PlayController.playVars.level;

        this.myblocks = new Blocks(this.game, this.game.world.centerX, this.game.world.centerY, 'blank', this.level);
    }

}

export default MainState;