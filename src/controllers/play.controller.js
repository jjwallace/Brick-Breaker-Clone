class PlayController {
    
    //static instance

    constructor(game) {
        
        if (!instance) {var instance = this; }
        this.time = new Date()
        
        this.playVars = {
            score : 0,
            playing: false,
            playTimer: 0,
            allBallsLaunched: false,
            endPlayXLocation: 0,
            ballSpeedIncrement: 400,
            speedControllTimer: 0,
            sound : false,
            ballSpeed : 800,
            currentBallSpeed : 800,
            maxBallSpeed: 5000
        }
        
        return instance;
    }
    
    endLaunch(){
        console.log('END LAUNCH');
    }
}

export default (new PlayController);

//ARTIFACTS
//this.gameData = this.game.cache.getJSON('game_data');
//console.log('GAME DATA LOADED:');
//console.log(this.gameData);


