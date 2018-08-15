import Cannon from '../objects/cannon';
import Balls from '../objects/balls';
import Aim from '../objects/aim';

import RayCast from '../objects/raycast';

class DragObj extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y);
        this.game.stage.addChild(this);
        
        this.arrowX = this.game.world.centerX;
        this.arrowY = this.game.world.height - 100;
        
        this.arrow = new Cannon(this.game, this.arrowX, this.arrowY, 'ball');
				this.game.stage.addChild(this.arrow);
				this.game.miscGroup.add(this.arrow);
        
        this.uiBottom = game.add.sprite(x, y, 'ui_bottom');
        this.uiBottom.anchor.set(0.5, 1);

        this.sprite = game.add.sprite(x, y, 'btn_drag');
        this.sprite.anchor.set(0.5, 1);

        this.sprite.inputEnabled = true;
        this.sprite.input.enableDrag();
        this.sprite.events.onDragStart.add(onDragStart, this);
        this.sprite.events.onDragStop.add(onDragStop, this);
        
        this.sprite.input.allowVerticalDrag = false;
        
				var speed = 600;
				var angle = this.arrow.angle;
				this.raycast = new RayCast(this.game, this.arrow.x, this.arrow.y, 'blank', angle, speed);
			
				this.aim = new Aim(this.game, this.arrow.x, this.arrow.y, 'blank');
				this.game.rayGroup.add(this.aim);
				this.aim.visible = false;
			
        function onDown(sprite, pointer) {
            
        }

        //this.game.ballGroup.countLiving()
        //check if there are balls
        
        function onDragStart(sprite, pointer) {
						this.aim.visible = true;
        }

        function onDragStop(sprite, pointer) {
						this.aim.visible = false;
            var speed = 800;
            var angle = this.arrow.angle;
            var maxBalls = 20;
            var myBalls = new Balls(this.game, this.arrow.x, this.arrow.y, 'blank', angle, speed, maxBalls);
        }
    }

    update() {
        
				var myAngle = -((this.x - this.sprite.x)/2 - 90)+180;
				this.arrow.angle = myAngle;
				this.aim.angle = myAngle;
				this.raycast.angle = this.arrow.angle;
    }
    
}

export default DragObj;