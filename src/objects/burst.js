class Burst extends Phaser.Sprite {

    constructor(game, x, y, key) {
        super(game, x, y, key);
        
        var mid = 16
        
//        this.x = x - 64 + mid - 6;
//        this.y = y - 64 + mid - 6;
        
        this.anchor.set(0.5);
        
        this.game.stage.addChild(this);
        
        var anim = this.animations.add('ani');  
        this.animations.play('ani', 30, false)//.onComplete(this.destroy());
        
        anim.killOnComplete = true;
        
        //THIS EMITTER IS TO HEAVY FOR COMMON USE, LEGACY CODE WILL REMAIL HERE FOR FUTURE USE
        
//        this.emitter = this.game.add.emitter(x+mid, y+mid, 100);
//        //this.emitter.scale.set(0.5);
//        this.emitter.makeParticles('fire');
//        this.emitter.gravity = 60;
//
//        this.emitter.start(true, 1000, null, 6);
//        
//        this.emitter.autoAlpha = true
//        
//        //this.game.add.tween(this.emitter.scale).to( { x:0, y:0 }, 2000, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);
//        
//        game.time.events.add(2000, function(){
//            this.emitter.destroy();
//            console.log('Emitter Destroyed');
//        }, this);
        
        
    }

    update() {
        //THIS EMITTER IS TO HEAVY FOR COMMON USE, LEGACY CODE WILL REMAIL HERE FOR FUTURE USE
        
//        this.emitter.forEachAlive(function(p){p.alpha = p.lifespan / this.emitter.lifespan;	}.bind(this));
    }
}

export default Burst;