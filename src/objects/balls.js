import Ball from '../objects/ball';

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
        
        this.balls = [];
        
        game.time.events.repeat(Phaser.Timer.SECOND / 10, this.maxBalls, addSprite, this);
 
        function addSprite() {
            if( this.ballCount < this.maxBalls){
								this.game.miscGroup.children[0].animations.play('ani', 30, false);  
							
                this.balls[this.ballCount] = new Ball(this.game, this.x, this.y, 'ball', this.angle, this.speed);
                this.ballCount ++;
            }
        }
        
    }
    
    update(){
                
    }
    
}

export default Balls;