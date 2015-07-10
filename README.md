# es6-game-of-phaser


This is a demo/shell for Phaser using ES6 classes/modules transpiled and package managed by JSPM. It also features Gulp to process files to a dist folder where node/express serves with gulp-live-server. JSPM transpiles automatically but the server does not use JSPM as per their suggestion.  Eventually it would be nice to have some kind of UI for the fun of it - I have React in mind to try it out. 


There are several pieces that can be used in part or in whole. I'll show a few ways to use it. The way I personally build it this way:


build config:

[/home/themime/]: cd es6-game-of-phaser

[/home/themime/es6-game-of-phaser/]: npm install

client config:

[/home/themime/es6-game-of-phaser/]: cd dist/client

[/home/themime/es6-game-of-phaser/dist/client/]: jspm install

server config

[/home/themime/es6-game-of-phaser/dist/client/]: cd ../server

[/home/themime/es6-game-of-phaser/dist/server/]: npm install

[/home/themime/es6-game-of-phaser/dist/server/]: cd ../../

[/home/themime/es6-game-of-phaser/]: gulp


This will copy client and server files to the dist folder (transpiling, jshint, etc) as needed and start gulp-live-server. 


If you have your own server you can run "gulp client" and serve files from dist/client.


TODO:

-the watches need corrected paths and uncommenting, the server reload doesn't actually work right now

-instructions on live reload in browser (its just a plugin)

-figured out issues/bugs thing and put these there?

-info on getting mongodb set up

-do something with the User route?

-what is going on with this spacing in this file?
