
class Aim extends Phaser.Sprite {

	constructor(game, x, y, key) {
		super(game, x, y, key);
		this.game.stage.addChild(this);
		this.anchor.set(0.5)
		this.x = x;
		this.y = y;

		this.maxLength = 60;

		this.aimer = [];
		
		for(var i = 0; i < this.maxLength; i ++){
			this.aimer[i] = game.add.sprite(0 + (14 * i), 0, 'convey');
			this.aimer[i].angle = +90;
			this.aimer[i].anchor.set(0.5);
			this.aimer[i].animations.add('ani');
			this.aimer[i].animations.play('ani', 30, true);
			this.aimer[i].alpha = (0.4)
			this.aimer[i].smoothed = false;
			
			this.addChild(this.aimer[i]);
        
		}
	}

}

export default Aim;