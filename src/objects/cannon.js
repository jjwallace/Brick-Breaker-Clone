class Cannon extends Phaser.Sprite {

    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.game.stage.addChild(this);

        this.animations.add('ani');    
        
        this.anchor.set(0.5)

        var sfx = game.add.audio('ball_hit', 100, false);

        function shoot(sprite) {
            sfx.play();
            sprite.play('ani');
        }
    }

}

export default Cannon;