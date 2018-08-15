import Ray from '../objects/ray';

class Raycast extends Phaser.Sprite {

	constructor(game, x, y, key, angle, speed ) {
		super(game, x, y, key);
		this.game.stage.addChild(this);

		this.x = x;
		this.y = y;

		this.speed = speed;
		this.angle = angle;
		this.maxBalls = 30;
		this.ballCount = 0;

		this.rays = [];

		//game.time.events.repeat(Phaser.Timer.SECOND / 10, this.maxBalls, addSprite, this);
//		this.buildComplete = false;
//		for(var i = 0; i < this.maxBalls; i ++){
//			this.rays[i] = new Ray(this.game, this.x, this.y, 'ray', this.angle, this.speed*3);
//		}
//		this.buildComplete = true;
	}

	update(){
		if(this.buildComplete == true){
			this.ballCount ++;
			
			if(this.ballCount >= this.maxBalls){this.ballCount = 0;}
			
//    for(var i = 0; i < this.maxBalls; i ++){
//      this.ballCount = i;
//			this.rays[this.ballCount].x = this.x;
//			this.rays[this.ballCount].y = this.y;
			this.game.physics.arcade.velocityFromAngle(this.angle, this.speed*3, this.rays[this.ballCount].body.velocity);
		}
	}

}

export default Raycast;