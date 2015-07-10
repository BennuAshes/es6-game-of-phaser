class BootState {
    preload () {
        
    }
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('load');
    }
    update() {
    }
}

export default BootState;