import NeighborManager from '../neighborManager';
import Utility from 'utility';


// TODO: Create some kind of consistent place/method 
// for cell->pixel conversion, perhaps by using a 
class ExploreState {
    tick() {
        // generate neighbor counts
        var neighborManager = new NeighborManager();

        // as each cell is added to the list, new counts are generated on the fly
        // this could be sped up by 
        this.cells.forEachAlive(function(aliveCell) {
            neighborManager.addCell(aliveCell);
        },this);
        
        //
        var markedCells = [];
        // for each cell that has neighbors (this can be refined to ones with certain neighbors since we know
        // certain ones would result in no movement; but this would need to be tracked in a 9 cell radius
        
        var neighboredCells = neighborManager.getCells();
        // TODO: convert this to ES6, tried let ..of syntax but couldn't find
        // how to get the key (which in this case is the x,y) let [x,xRow] didn't work, it returned 0,undefined
        console.log('explore',neighboredCells);
        for(var x in neighboredCells) {      
            var xRow = neighboredCells[x];
            console.log('explore',x,xRow);
            for(var y in xRow) {                
                // this is getting hacky
                var tile = xRow[y];
                var count = tile.Count; // Cells.length;
                var cell = tile.Cell; // this is the specific cell
                
                console.log('explore',y,tile);
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
                        console.log("adding cell at x,y,",x,y);
                        this.createCell(x,y);
                    }
                }/* else if (count == 2) {
                    // organism evolves - change frame
                    cell.frame = 1;
                }*/
            }
        }
        console.log(neighborManager);
        markedCells.forEach(function(cell) {
            cell.kill();                
        });
  
        
    }
    createCell (newCellX,newCellY) {
        var cell = this.game.add.sprite(newCellX* Utility.CELL_SIZE,newCellY* Utility.CELL_SIZE,'cell');
        this.game.physics.enable(cell,Phaser.Physics.ARCADE);                    
        this.cells.add(cell);
        return cell;
        
    }
    create() {        
        this.cells = this.game.add.group();       
        
        for(let x=0; x < Utility.WORLD_SIZE;x+=(this.game.rnd.integerInRange(0,4))) {
            for(let y=0; y < Utility.WORLD_SIZE;y+=this.game.rnd.integerInRange(0,4)) {                
                this.createCell(x,y);
            }
        }
        this.game.time.events.loop(500, this.tick, this);        
    }
    
    
    update() {
        
    }
    
    
}

export default ExploreState;