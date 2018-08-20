class Overlay extends Phaser.Sprite {

    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.game.stage.addChild(this);
        
        this.anchor.setTo(0.5, 0.5);

        var sfx = game.add.audio('speed');

        sfx.play();
        
        function theEnd(){
            this.destroy();
            console.log('speed')
        }
        
        this.alpha = 0;
        
        //this.game.add.tween(this.uiBottom).to( { y: this.y }, 1000, Phaser.Easing.Quartic.inOut, true);
        game.add.tween(this)
            .to( { alpha: 1 }, 500, Phaser.Easing.Quartic.inOut, true, 0)
            .to( { alpha: 0 }, 500, Phaser.Easing.Quartic.inOut, true, 0)
            .onComplete.addOnce(theEnd, this);
    }

    update() {

    }
}

export default Overlay;