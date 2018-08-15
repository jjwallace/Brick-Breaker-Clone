class BootState extends Phaser.State {

    create() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.stage.smoothed = false;
        this.game.antialias = false;
        this.game.renderer.renderSession.roundPixels = true;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();
			
				//this.stage.backgroundColor = "88D5E5";
        
        this.state.start('PreloadState');
    }
}

export default BootState;