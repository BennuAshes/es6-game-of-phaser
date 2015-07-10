var express = require('express');
var restful = require('node-restful');
var path = require('path');
var mongoose = restful.mongoose;
var app = express();
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var requireDir = require('require-dir');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.query());


app.use(express.static(path.join(__dirname, '../client')));

//mongoose.connect("mongodb://localhost/phaser");


// these don't export anything, they just hook in the routes
// import 'route/user';
//requireDir('route');
//import 'player';



app.listen(3000);


export {restful,mongoose,app};