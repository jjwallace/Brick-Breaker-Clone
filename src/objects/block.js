class Block extends Phaser.Sprite {

    constructor(game, x, y, key, health, type, id) {
        super(game, x, y, key, health, type, id);
        
        this.x = x;
        this.y = y;
        this.health = health;
        this.type = type;
        this.id = id;
        
        //this.alive = true;
        
        this.game = game;
        
        var blockSize = 32;
        var hb = blockSize / 2;
        
        //SOUNDS
        this.sfxHit = this.game.add.audio('pop');
        this.sfxBoom = this.game.add.audio('boom');
        
        this.anchor.set(0.5);
        
        var style = { font: "12px Arial", fill: "#ffffff", align: "center" };
        this.text = game.add.text(0, 0+2, this.health, style);
        this.text.stroke = '#000000';
        this.text.strokeThickness = 4;

        this.addChild(this.text);
        
        this.boom = game.add.sprite(0, 0, 'damage');
        this.boom.anchor.set(0.5);
        this.boom.animations.add('ani');    
        //this.boom.animations.play('ani', 30, true);

        this.addChild(this.boom);

        this.text.anchor.set(0.5);
        
        this.game.stage.addChild(this);
        
        this.health = health;
        this.type = type;
        
        this.boomMe = function() {
            this.boom.animations.play('ani', 30, false);
            
        }.bind(this);
        
        game.physics.arcade.enable(this);
        this.body.bounce.set(1);
        this.body.immovable = true;
        
        game.blockGroup.add(this);
    }

}

export default Block;