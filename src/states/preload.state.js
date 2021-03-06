import ManifestLoader from 'phaser-manifest-loader'
import AssetManifest from '../AssetManifest';

const req = require.context('../assets', true, /.*\.png|json|ttf|woff|woff2|xml|mp3|jpg$/);

class PreloadState extends Phaser.State {
	
		preload(){
//			this.load.json('lvl1', 'assets/json/lvl1.json');
//			this.load.start();
		}

    create() {
				
        this.manifestLoader = this.game.plugins.add(ManifestLoader, req)
        Promise.all([
          this.manifestLoader.loadManifest(AssetManifest)
        ]).then(() => {
          this.game.state.start('MainState')
        })
    }
}

export default PreloadState;