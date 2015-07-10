import 'phaser';
import BootState from 'states/boot';
import LoadState from 'states/load';
import MenuState from 'states/menu';
import ExploreState from 'states/explore';

var game = new Phaser.Game(592 ,592, Phaser.AUTO, 'game');

game.state.add('boot',BootState);
game.state.add('load',LoadState);
game.state.add('menu',MenuState);
game.state.add('explore',ExploreState);

game.state.start('boot');