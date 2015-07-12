import NeighborManager from '../neighborManager';
import Utility from 'utility';


// TODO: Create some kind of consistent place/method 
// for cell->pixel conversion, perhaps by using a 
class ExploreState {
    tick() {
        // generate neighbor counts
        var neighborManager = new NeighborManager();

        // as each cell is added to the list, new counts are generated on the fly
        this.cells.forEachAlive(aliveCell => {
            neighborManager.addCell(aliveCell);
        },this);
        
        //
        var markedCells = [];
        // for each cell that has neighbors (this can be refined to ones with certain neighbors since we know
        // certain ones would result in no movement; but this would need to be tracked in a 9 cell radius
        
        var neighboredCells = neighborManager.getCells();
        // TODO: convert this to ES6, tried let ..of syntax but couldn't find
        // how to get the key (which in this case is the x,y) let [x,xRow] didn't work, it returned 0,undefined
        //console.log('explore tick()',neighboredCells,this.cells);
        for(var x in neighboredCells) {      
            var xRow = neighboredCells[x];
            //console.log('explore',x,xRow);
            for(var y in xRow) {                
                // this is getting hacky
                var tile = xRow[y];
                var count = tile.Count;
                // this is the specific live cell in this tile
                var cell = tile.Cell; 
                
                //console.log('explore',y,tile);
                // can do things with cells here yay!
                if(count > 3) {
                    if(cell !== null) {
                        markedCells.push(cell);
                    }
                } else if (count < 2) {
                    if(cell !== null) {
                        markedCells.push(cell);
                    }
                } else if(count == 3) {
                    // cell comes "alive" which means one is created
                    // this is kind of hacked in, rather than some
                    // kind of consistent pattern.
                    // this whole tile concept is messed up,
                    // I'm really just trying to get the algorithm 
                    // working for the first time
                    // TODO: does phaser keep cells in the group
                    // that are "killed" - if so make them "alive" 
                    // instead of creating a new one?
                    if(cell !== null) {
                        cell.frame = 1;
                    } else {
                        this.growCell(x,y);
                    }
                }
            }
        }
        //console.log(neighborManager);
        markedCells.forEach(function(cell) {
            cell.kill();                
        });
  
        
    }
    growCell (newCellX,newCellY) {
        var cell = this.game.add.sprite(Utility.cellToPixel(newCellX) ,Utility.cellToPixel(newCellY),'cell');
        this.game.physics.enable(cell,Phaser.Physics.ARCADE);
        this.cells.add(cell);
        
        return cell;
        
    } 
    create() {        
        this.cells = this.game.add.group();       
        // x,y in cells not pixels
        for(let x=0; x < Utility.WORLD_SIZE;x+=(this.game.rnd.integerInRange(0,6))) {
            for(let y=0; y < Utility.WORLD_SIZE;y+=this.game.rnd.integerInRange(0,6)) {                
                this.growCell(x,y);
            }
        }
        
        this.input.onUp.add(pointer => {
            console.log(pointer);
            // TODO: just guessing on the exact x,y to use right now, confirm?
            this.growCell(Utility.pixelToCell(pointer.x),Utility.pixelToCell(pointer.y)); 
        },this);
        
        this.game.time.events.loop(500, this.tick, this);        
    }
    
    
    update() {
        // all the magic happens in the create() event loop triggering this.tick()
    }
    
    
}

export default ExploreState;