class MenuConfig {

	constructor(game) {

		if (!instance) {var instance = this; }

		this.options = {
			tileWidth: 96, //HOW WIDE IS A TILE
			tileRow: 4, //HOW MANY TILES ARE IN A ROW / HOW MANY COLUMS ARE THERE
			tileStartY: 96, //START SPOT FROM TOP
    	pageMax: 16
		};

    this.lvls ={ 
          "current": 0,
              "lvl":[
                  {"name": "blank", "complete": true, "score": 3},
                  {"name": "blank", "complete": true, "score": 2},
                  {"name": "blank", "complete": true, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0},
                  {"name": "blank", "complete": false, "score": 0}

              ]
      }
      
		return instance;
	}
}

export default (new MenuConfig);

