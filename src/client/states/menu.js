class MenuState {
    preload() {
        
    }
    create() {
        
        var nameLabel = this.game.add.text(80,80, 'Programmer Art. \nYou\'ve been warned!', {font: '50px Arial', fill: '#ffffff'});
        var startLabel = this.game.add.text(80, this.game.world.height-80,'press SPACE to start',{font:'25px Arial', fill: "#ffffff"});
        
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        wkey.onDown.addOnce(this.start,this);
    }
    update() {
        
    }
    //
    start() {
        this.game.state.start('explore');
    }
}


export default MenuState;