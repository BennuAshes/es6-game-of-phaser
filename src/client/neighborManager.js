import Utility from 'utility';
class NeighborManager {
    constructor() {
        // an array 
        this.neighbors = {};
    }
    getCells() {
        return this.neighbors;
    }
    addCell (cell) {
        // case [0,0] is handled in this method on its own
        var diff = [
            [1,1],
            [-1,-1],
            [0,-1],
            [0,1],
            [1,0],
            [-1,0]
        ];
        // [0,0] isn't a neighbor so Count isn't incremented
        // but instead the Cell property is set
        // this whole concept is bunky and needs cleaning up
        this.setCell(Utility.pixelToCell(cell.body.x), Utility.pixelToCell(cell.body.y),cell);
        
        // for(let i = 0; i < diff.length; i++) {
        for(let delta of diff) {
            // var delta = diff[i];
            
            var dx = delta[0];
            var dy = delta[1];
            
            this.incNeighbor(Utility.pixelToCell(cell.body.x) + dx, Utility.pixelToCell(cell.body.y) + dy);
        }
        
        console.log('neighborManager - ',this.neighbors);
        
    }
    setCell(x,y,cell) {
        if(typeof this.neighbors[x] === 'undefined') {
            this.neighbors[x] = {};
        }
        if(typeof this.neighbors[x][y] === 'undefined') {
            console.log('setting cell for first time ideally at x,y',x,y,cell);
            this.neighbors[x][y] = {Count: 0,Cell:null};
        }
        if(this.neighbors[x][y].Cell === null) {
            this.neighbors[x][y].Cell = cell;
        }
        
    }
    incNeighbor (x,y) {
        this.setCell(x,y,null);
        
        
        this.neighbors[x][y].Count += 1;
        
    }
    
    getCount (x,y) {
        //var x = cell.body.x;
        //var y = cell.body.y;
        var val = 0;
        if(this.neighbors[x] && this.neighbors[x][y]) {
            console.log('NeighborManager - this.getCount found:',val);
            val = this.neighbors[x][y].Count;
        }
        
        
        
        return val;           
    }
    
    clear () {
        this.neighbors = {};
    }
}

export default NeighborManager;