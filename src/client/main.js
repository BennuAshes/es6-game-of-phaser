import 'phaser';

import BootState from 'states/boot';
import LoadState from 'states/load';
import MenuState from 'states/menu';
import ExploreState from 'states/explore';

import Utility from 'utility';

var SIZE = Utility.WORLD_SIZE*Utility.CELL_SIZE; // cells * 16 per TODO: replace with import from utility
var game = new Phaser.Game(SIZE ,SIZE, Phaser.AUTO, 'game');

game.state.add('boot',BootState);
game.state.add('load',LoadState);
game.state.add('menu',MenuState);
game.state.add('explore',ExploreState);

game.state.start('boot');