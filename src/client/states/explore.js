import NeighborManager from '../neighborManager';

class ExploreState {
    tick() {
        
        var neighborManager = new NeighborManager();
        
        this.cells.forEachAlive(function(aliveCell) {
            neighborManager.addCell(aliveCell);
        },this);
        
        // 
        var markedCells = [];
        this.cells.forEachAlive(function(aliveCell) {
            var count = neighborManager.getCount(aliveCell);
            if(count > 3) {
                markedCells.push(aliveCell);
            } else if (count <=1) {
                markedCells.push(aliveCell);
            } else if(count == 3) {
                // cell comes alive
                aliveCell.frame = 1;
            } else if (count == 2) {
                // organism evolves? - for now just chance the individual cell
                aliveCell.frame = 2;
            }
            
            
        },this);
        
        console.log(neighborManager);
        markedCells.forEach(function(cell) {
            cell.kill();                
        });
    }
    
    cellProgress() {
        
    }
    foodGrowth() {
    
    }
    weather() {
    
    }
    preload() {
        
    }
    
    createCell (x,y) {
        var cell = this.game.add.sprite(x,y,'cell');
        this.game.physics.enable(cell,Phaser.Physics.ARCADE);                    
        this.cells.add(cell);
        
    }
    create() {
        this.cells = this.game.add.group();
        var max = this.game.rnd.integerInRange(4,12);
        if(max> 12)max=1;
        for(var x=0; x < this.game.world.width;x+=16*(this.game.rnd.integerInRange(0,max))) {                        
            max = this.game.rnd.integerInRange(4,12);
            if(max> 12)max=0;
            for(var y=0; y < this.game.world.height;y+=16*(this.game.rnd.integerInRange(0,max))) {                
                this.createCell(x,y);
            }
        }
        this.game.time.events.loop(2000, this.tick, this);
    }
    update() {
        
    }
    
    
}

export default ExploreState;