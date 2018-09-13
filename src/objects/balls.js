import Ball from '../objects/ball';
import PlayController from '../controllers/play.controller';

import Overlay from '../ui/overlay';

class Balls extends Phaser.Sprite {

    constructor(game, x, y, key, angle, speed, maxBalls ) {
        super(game, x, y, key);
        this.game.stage.addChild(this);
        
        this.x = x;
        this.y = y;
        
        this.game = game;
        
        this.speed = speed;
        this.angle = angle;
        this.maxBalls = maxBalls;
        this.ballCount = 0;
        
        this.anchor.setTo(0.5, 0.5);
        
        this.balls = [];
        
        this.spawnCounter = game.time.events.repeat(Phaser.Timer.SECOND / 10, this.maxBalls, addSprite, this);
 
        function addSprite() {
            this.balls[this.ballCount] = new Ball(this.game, this.x, this.y, 'ball', this.ballCount, this.angle, this.speed);
            
            this.ballCount ++;
            
            if( this.ballCount == this.maxBalls){
                PlayController.playVars.allBallsLaunched = true;
                PlayController.endLaunch();
                //this.game.stage.DragObj.arrow.y += 200;
                this.alpha = false;
            }
        }
        
        
        this.stepCounter = game.time.events.repeat(Phaser.Timer.SECOND * 5, 5, tick, this);
        
        function tick() {
            if(PlayController.playVars.playing == true){
                //Increase all balls speed        
                var speedIncrease = function(increment){
                    PlayController.playVars.currentBallSpeed += increment;

                    this.game.ballGroup.forEach(function(item) {
                        item.speedUpdate(increment);
                    });
                    console.log('Ball Speed Increased: ' + speed)
                }.bind(this);

                PlayController.playVars.currentBallSpeed += PlayController.playVars.ballSpeedIncrement;

                //Increase ball speed at time in seconds of play
                speedIncrease(PlayController.playVars.currentBallSpeed);

                this.overlay = new Overlay(this.game, this.game.world.centerX, this.game.world.centerY, 'fast_forward');
            }
        }
    }
    
    stopSpawningBalls(){
        this.game.time.events.remove(this.spawnCounter);
    }
    
    stopEverything(){
        this.game.time.events.remove(this.stepCounter);
    }
    
    update(){
//        if(PlayController.playVars.playing){
//            var seconds = Math.floor(PlayController.playVars.playTimer/30);
//            
//            console.log(seconds);
//            
//            if(PlayController.playVars.speedControllTimer == seconds-1){
//                PlayController.playVars.speedControllTimer = seconds;
//                var increment = PlayController.playVars.ballSpeedIncrement;
//
//                  
//            }
//            
//        }
    }   
}

export default Balls;