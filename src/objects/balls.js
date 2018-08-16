import Ball from '../objects/ball';
import PlayController from '../controllers/play.controller';

class Balls extends Phaser.Sprite {

    constructor(game, x, y, key, angle, speed, maxBalls ) {
        super(game, x, y, key);
        this.game.stage.addChild(this);
        
        this.x = x;
        this.y = y;
        
        this.speed = speed;
        this.angle = angle;
        this.maxBalls = maxBalls;
        this.ballCount = 0;
        
        this.anchor.setTo(0.5, 0.5);
        
        this.balls = [];
        
        game.time.events.repeat(Phaser.Timer.SECOND / 10, this.maxBalls, addSprite, this);
 
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
        
    }
    
    update(){
                
    }
    
}

export default Balls;