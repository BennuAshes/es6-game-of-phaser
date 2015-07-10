class LoadState {        
    preload() {
        var label = this.game.add.text(80,150, 'loading...',{font: '30px Courier', fill:'#ffffff'});
        this.game.load.spritesheet('cell','resource/asset/cell.png',16,16,3);
    }
    create() {
        this.game.state.start('menu');
    }
    update() {
        
    }
    
}

export default LoadState;