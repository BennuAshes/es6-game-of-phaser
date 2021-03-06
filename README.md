# es6-game-of-phaser

## Overview

This is a demo/shell for Phaser using ES6 classes/modules transpiled and package managed by JSPM. The "theme" is a simplified algorithm based on Conway's Game of Life, a cell proliferation simulation. The game is wrapped in a series of module components that are interchangeable (client, server, build process, and maybe you could count the "behavior" for the game itself as a separate component - which will need to be separated out).

### Client
ES6 using JSPM to transpile (using babel, but this can easily be updated to traceur). Phaser, the javascript game engine, is used to demo basic cell proliferation. The game is broken into states which are ES6 classes inside ES6 modules which are loaded and transpiled by JSPM. However, if you wish to use another manager you can uncomment out the babel() line in the gulp file and tweak the index file accordingly.

### Server
At it's core, a node/express server. Mongoose+node-restful are used to create a rapid REST API backend. The next step is to introduce websockets and some kind of multiplayer element to the simulation

### Build
Gulp is used to process files to a dist folder where node/express serves with gulp-live-server. Since JSPM does not recommend itself for node servers yet, gulp is used with the babel module to convert the ES6 backend into a useuable node app.

### Conway's Game of Life
<https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life>

"Any live cell with fewer than two live neighbours dies, as if caused by under-population.  
Any live cell with two or three live neighbours lives on to the next generation.  
Any live cell with more than three live neighbours dies, as if by overcrowding.  
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction."  

The current version is a copy of the above algorithm (It's been moderately tested, but please let me know if you disagree - the previous version /definitely/ wasn't a correct version as no new cells were ever created).

Click to add cells, steps forward and back, etc would also be nice. Lot's of features other people have implemented that could be added here.  

## How to Use/Set up    

#### build config:  
cd es6-game-of-phaser  
npm install  
#### client config:  
cd dist/client  
jspm install  
#### server config:  
cd ../server  
npm install  
cd ../../  
gulp  

This will copy client and server files to the dist folder (transpiling, jshint, etc) as needed and start gulp-live-server. Download the extension Chrome Live Reload and click the icon and when you make a chance you should see gulp rerun the tasks and your window refresh.  

If you have your own server you can run "gulp client" and serve files from dist/client.  

Troubleshooting: I develop on Windows for various reasons - when setting it up on linux I had to manually "jspm install babel" then "jspm install" otherwise I'd get an error with babel-core.

## UI - React?
Eventually it would be nice to have some kind of UI for the fun of it - I have React in mind to try it out.  

## TODO:
* remove dist directory - have it be removed by del and created from scratch to avoid confusion (I'm confusing myself right now with this experimental setup
* figured out issues/bugs thing and put these there?
* info on getting mongodb set up
* do something with the User route?
* separate out Game of Life AI behavior so it can be interchangeable
* unit testing maybe? most of my desire to unit test was centered around AngularJS, so maybe node unit testing or if React becomes apart of the project there could be testing for that
