import Cannon from '../objects/cannon';
import Balls from '../objects/balls';
import Aim from '../objects/aim';

import RayCast from '../objects/raycast';

import PlayController from '../controllers/play.controller';

class DragObj extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y);
        this.game.stage.addChild(this);
        
        this.x = x;
        this.y = y;
        
        this.arrowX = this.game.world.centerX;
        this.arrowY = this.game.world.height - 100;
        
        this.arrow = new Cannon(this.game, this.arrowX, this.arrowY, 'ball');
				this.game.stage.addChild(this.arrow);
				this.game.miscGroup.add(this.arrow);
        
        this.uiBottom = game.add.sprite(x, y, 'ui_bottom');
        this.uiBottom.anchor.set(0.5, 1);

        this.sprite = game.add.sprite(x, y, 'btn_drag');
        this.sprite.anchor.set(0.5, 1);

        this.sprite.inputEnabled = true;
        this.sprite.input.enableDrag();
        this.sprite.events.onDragStart.add(onDragStart, this);
        this.sprite.events.onDragStop.add(onDragStop, this);
        
        this.sprite.input.allowVerticalDrag = false;
        
				var speed = 600;
				var angle = this.arrow.angle;
				this.raycast = new RayCast(this.game, this.arrow.x, this.arrow.y, 'blank', angle, speed);
			
				this.aim = new Aim(this.game, this.arrow.x, this.arrow.y, 'blank');
				this.game.rayGroup.add(this.aim);
				this.aim.visible = false;
			
        function onDown(sprite, pointer) {
            //Reserved for Raycast.
        }
        
        function onDragStart(sprite, pointer) {
            
						this.aim.visible = true;
        }

        function onDragStop(sprite, pointer) {
            
						this.aim.visible = false;
            var speed = PlayController.playVars.ballSpeed;
            var angle = this.arrow.angle;
            var maxBalls = 20;
            this.myBalls = new Balls(this.game, this.arrow.x, this.arrow.y, 'ball', angle, speed, maxBalls);
            
            PlayController.playVars.allBallsLaunched = false;
            
            this.game.add.tween(this.sprite).to( { x: this.x }, 2000, Phaser.Easing.Quartic.Out, true);
            
            this.arrow.visible = false;
            
            PlayController.playVars.playing = true;
            PlayController.playVars.playTimer = 0;
            
            this.sprite.inputEnabled = false;
            
            this.game.add.tween(this.uiBottom).to( { y: this.y+200 }, 900, Phaser.Easing.Quartic.Out, true);
            
            this.game.add.tween(this.sprite).to( { y: this.y+200 }, 900, Phaser.Easing.Quartic.Out, true);
            
        }
    }

    update() {
        
        //Increment Play Timer
        if(PlayController.playVars.playing){
            
            //Check if balls are in play
            if(this.game.ballGroup.countLiving() == 0 && PlayController.playVars.playTimer > 10){
                console.log('PLAY COMPLETE');
                
                PlayController.playVars.playing = false;
                this.sprite.inputEnabled = true;
                
                PlayController.playVars.currentBallSpeed = PlayController.playVars.ballSpeed;
                
                this.arrow.y = this.arrowY + 150;
                this.arrow.x = PlayController.playVars.endPlayXLocation;
                this.aim.x = this.arrow.x;
                
                this.arrow.visible = true;
                this.game.add.tween(this.arrow).to( {x: PlayController.playVars.endPlayXLocation , y: this.arrowY }, 500, Phaser.Easing.Quartic.Out, true);
                
                this.myBalls.stopEverything();
                
                this.game.add.tween(this.uiBottom).to( { y: this.y }, 1000, Phaser.Easing.Quartic.Out, true);

                this.game.add.tween(this.sprite).to( { y: this.y }, 1000, Phaser.Easing.Quartic.Out, true);
            }
            
            PlayController.playVars.playTimer ++;
            
        }
        
				var myAngle = -((this.x - this.sprite.x)/2 - 90)+180;
				this.arrow.angle = myAngle;
				this.aim.angle = myAngle;
				this.raycast.angle = this.arrow.angle;
    }
    
}

export default DragObj;