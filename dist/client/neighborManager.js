class NeighborManager {
    constructor() {
        this.neighbors = {};
    }
    
    addCell (cell) {
        var diff = [
            [1,1],
            [-1,-1],
            [0,-1],
            [0,1],
            [1,0],
            [-1,0]
        ];
        
        
        for(var i = 0; i < diff.length; i++) {
            var delta = diff[i];
            
            var dx = delta[0]*16;
            var dy = delta[1]*16;
            
            this.incNeighbor(cell.body.x + dx, cell.body.y + dy);
        }
        
    }
    
    incNeighbor (x,y) {
        if(typeof this.neighbors[x] === 'undefined') {
            this.neighbors[x] = {};
        }
        if(typeof this.neighbors[x][y] === 'undefined') {
            this.neighbors[x][y] = 0;
        }
        this.neighbors[x][y] += 1;
    }
    
    getCount (cell) {
        var x = cell.body.x;
        var y = cell.body.y;
        var val = 0;
        if(this.neighbors[x] && this.neighbors[x][y]) {
            console.log('NeighborManager - this.getCount found:',val);
            val = this.neighbors[x][y];
        }
        
        
        
        return val;           
    }
    
    clear () {
        this.neighbors = {};
    }
}

export default NeighborManager;