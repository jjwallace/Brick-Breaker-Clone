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
        
        //set bounding box a little smaller (no sure the format of the 2s)
				//this.body.setSize(2, 2, 2, 2);
        
        function hitWorldBounds (sprite) {
            sfxHit.play();
            //sprite.play('ani');
        }
        
        function outOfBoundsTop (sprite) {
            this.destroy();
            if(sprite.id == 0){
                PlayController.playVars.endPlayXLocation = sprite.x;
                console.log("OUT OF PLAY: " + sprite.x);
            }
        }

        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(outOfBoundsTop, this);
        
        this.body.onWorldBounds.add(hitWorldBounds, this);
    }
    
    update() {
        //this.game.physics.arcade.velocityFromAngle(this.angle, PlayController.playVars.currentBallSpeed, this.body.velocity);
    }
}

export default Ball;