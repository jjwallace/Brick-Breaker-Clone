import Balls from '../objects/balls';

class Cannon extends Phaser.Sprite {

    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.game.stage.addChild(this);

        this.animations.add('ani');    
        
        //this.anchor.set(0, 0.5);
        this.anchor.set(0.5)

        var sfx = game.add.audio('ball_hit', 100, false);

        function shoot(sprite) {
            sfx.play();
            sprite.play('ani');
        }
    }
    
    update() {
        //  This will update the sprite.rotation so that it points to the currently active pointer
        //  On a Desktop that is the mouse, on mobile the most recent finger press.
        //this.rotation = this.game.physics.arcade.angleToPointer(this);
    }

}

export default Cannon;