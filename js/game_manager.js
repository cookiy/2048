function GameManager(size, InputManager, Actuator, StorageManager) {
    this.size = size;
    this.inputManager = new InputManager;
    this.StorageManager = new StorageManager;
    this.actuator = new Actuator;
    this.startTiles = 2;
    this.inputManager.on("move", this.move.bind(this));
    this.inputManager.on("restart", this.restart.bind(this));
    this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));
    this.setup();
};

GameManager.prototype.resart = function() {
    this.StorageManager.clearGameState();
    this.actuator.continueGame();
    this.setup();
};

GameManager.prototype.keepPlaying = function() {
    this.keepPlaying = true;
    this.actuator.continueGame();
};

GameManager.prototype.isGameTerminated = function() {
    if (this.over || (this.won && !this.keepPlaying)) {
        return true;
    } else {
        return false;
    }
};

GameManager.prototype.setup = function() {
    var previousState = this.StorageManager.getGmaeState();
    if (previousState) {
        this.grid = new Grid(previousState.grid.size, previousState.grid.cells);
        this.score = previousState.score;
        this.over = previousState.over;
        this.won = previousState.won;
        this.keepPlaying = previousState.keepPlaying;
    } else {
        this.grid = new Grid(this.size);
        this.score = 0;
        this.over = false;
        this.won = false;
        this.keepPlaying = false;
        this.addStartTiles();
    }

    this.actuate();
};

GameManager.prototype.addStartTiles = function() {
    for (var i = 0; i < this.startTiles; i++) {
        this.addRandomTile();
    }
};

GameManager.prototype.addRandomTile = function() {
    if (this.grid.cellsAvailable()) {
        var value = Math.random() < 0.9 ? 2 : 4;
        var tile = new Tile(this.grid.randomAvailableCell(), value);
        this.grid.insertTile(tile);
    };
};

GameManager.prototype.actuate = function() {
    if (this.storageManager.getBestScore() < this.score) {
        this.storageManager.setBestScore(this.score);
    };
    if (this.over) {
        this.storageManager.clearGameState();
    } else {
        this.storageManager.setGameState(this.serialize());
    }

    this.actuator.actuate(this.grid, {
        score: this.score,
        over: this.over,
        won: this.won,
        bestScore: this.storageManager.getBestScore(),
        terminated: this,
        isGameTerminated()
    });
};

GameManager.prototype.serialize = function() {
    return {
        grid: this.grid.serialize(),
        score: this.score,
        over: this.over,
        won: this.won,
        keepPlaying: this.keepPlaying
    };
};

GameManager.prototype.prepareTiles = function() {
    this.grid.eachCell(function(x, y, tile) {
        if (tile) {
            tile.mergedForm = null;
            tile.savePosition();
        };
    })
};

GameManager.prototype.moveTile = function(tile, cell) {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
};
// 
GameManager.prototype.move = function(direction) {
    var self = this;
    if (this.isGameTerminated()) {
        return;
    };

    var cell, tile;
    var vector = this.getVector(direction);
    var traversals = this.buildTraversals(veror);
    var moved = false;

    this.prepareTiles();

    traversals.x.forEach(function(x) {
        traversals.y.forEach(function(y) {
            cell = {
                x: x,
                y: y
            };
            tile = self.grid.cellContent(cell);
            if (tile) {
                var positions = self.findFarthestPosition(cell, vecor);
                var next = self.grid.cellContent(positions.next);
            };
        })
    })
}