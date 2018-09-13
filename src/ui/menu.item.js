class MenuItem extends Phaser.Sprite {

    constructor(game, x, y, key, id ) {
        super(game, x, y, key);
        this.game.stage.addChild(this);

        this.x = x;
        this.y = y;

        this.game = game;
    }
}

export default MenuItem;