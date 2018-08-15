class Ray extends Phaser.Sprite {

	constructor(game, x, y, key, angle, speed) {
		super(game, x, y, key);
		this.game.stage.addChild(this);   
		
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speed = speed;

		this.anchor.setTo(0.5, 0.5);

		game.physics.arcade.enable(this);
		this.enableBody = true;

		//this.angle = angle;
		game.physics.arcade.velocityFromAngle(this.angle, this.speed, this.body.velocity);

		this.body.bounce.set(1);

		this.body.collideWorldBounds = true;
		this.body.onWorldBounds = new Phaser.Signal();

		this.game.physics.arcade.checkCollision.down = false;
		this.outOfBoundsKill = true;

		var sfxHit = game.add.audio('ball_hit', 100, false);

		game.rayGroup.add(this);

	}

	update() {
      //this.game.physics.arcade.velocityFromAngle(this.angle, this.speed, this.body.velocity);
	}
}

export default Ray;