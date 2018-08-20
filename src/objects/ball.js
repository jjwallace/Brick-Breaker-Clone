import PlayController from '../controllers/play.controller';

class Ball extends Phaser.Sprite {

    constructor(game, x, y, key, id, angle, speed) {
        super(game, x, y, key);
        this.game.stage.addChild(this);
        this.animations.add('ani');    
        //this.animations.play('ani', 30, true);

        this.id = id;
        this.anchor.setTo(0.5, 0.5);
        
        game.physics.arcade.enable(this);
        this.enableBody = true;
        
        this.angle = angle;
        game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

        this.body.bounce.set(1);

        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = new Phaser.Signal();
        
        this.game.physics.arcade.checkCollision.down = false;
        this.outOfBoundsKill = true;
        
        var sfxHit = game.add.audio('hit_ball');
        
        game.ballGroup.add(this);
        
        function hitWorldBounds (sprite) {
            //sfxHit.play();
        }
        
        function outOfBoundsTop (sprite) {
            if(sprite.id == 0){
                PlayController.playVars.endPlayXLocation = sprite.x;
                console.log("FIRST BALL OUT AT X: " + sprite.x);
                //console.log("SPEED OF BALL: " + sprite.body.speed);
            }
            this.destroy();
        }

        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(outOfBoundsTop, this);
        
        this.body.onWorldBounds.add(hitWorldBounds, this);
    }
    
    speedUpdate(speed){
        var speedInc = speed / this.body.speed;
        this.body.velocity.x *= speedInc;
        this.body.velocity.y *= speedInc;
    }
    
    update() {
        
    }
}

export default Ball;