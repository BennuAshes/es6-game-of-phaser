import Utility from 'utility';

// TODO: Clean up the wording, this whole file is not very
// clear and probably not very efficient, it is not known if it follows 
// a specific pattern for Game of Life
class NeighborManager {
    constructor() {
        this.neighbors = {};
    }
    getCells() {
        return this.neighbors;
    }
    addCell (cell) {
        // case [0,0] is handled in this method on its own - really just to 
        // add the specific cell so it doesn't have to be looked up later
        var diff = [
            [1,1],
            [-1,-1],
            [0,-1],
            [0,1],
            [1,0],
            [-1,0],
            [1,-1],
            [-1,1]
        ];
        // [0,0] isn't a neighbor so Count isn't incremented
        // but instead the Cell property is set
        // this whole concept is bunky and needs cleaning up
        this.setCell(Utility.pixelToCell(cell.body.x), Utility.pixelToCell(cell.body.y),cell);
        
        for(let delta of diff) {         
            console.log('for delta: ',delta);
            var dx = delta[0];
            var dy = delta[1];
            console.log("neighbor manager addCell - dx,dy",dx,dy);
            this.incNeighbor(Utility.pixelToCell(cell.body.x) + dx, Utility.pixelToCell(cell.body.y) + dy);
        }
        
    }
    // create a place where a count and/or a cell can be held
    setCell(x,y,cell) {
        if(typeof this.neighbors[x] === 'undefined') {
            this.neighbors[x] = {};
        }
        if(typeof this.neighbors[x][y] === 'undefined') {
            this.neighbors[x][y] = {Count: 0,Cell:null};
        }
        if(cell !== null) {
            this.neighbors[x][y].Cell = cell;
        }        
    }
    incNeighbor (x,y) {
        this.setCell(x,y,null);
        this.neighbors[x][y].Count += 1;
    }
    
    getCount (x,y) {
        var val = 0;
        if(this.neighbors[x] && this.neighbors[x][y]) {
            val = this.neighbors[x][y].Count;
        }
        
        return val;           
    }
    
    clear () {
        this.neighbors = {};
    }
}

export default NeighborManager;