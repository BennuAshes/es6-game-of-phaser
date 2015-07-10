var gulp = require('gulp');
var concat = require('gulp-concat');
var gls = require('gulp-live-server');
//var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
//var minifyCSS = require('gulp-minify-css');
var del = require('del');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
// var traceur = require('gulp-traceur');
//var runSequence = require('run-sequence');

gulp.task('clean',function(cb) {
	del.sync([
		'./dist/client/!(jspm_packages|node_modules|package.json|config.js|resource)**',
        './dist/server/!(node_modules|package.json|resource)**'        
	],cb); 
    //{force:true} // allow outside working dir
});

gulp.task('default',['clean','start']);

gulp.task('build',['client','server']);

// "build" forces gulp to wait (its a dependency)
gulp.task('start',['build'],function() {
    var server = gls.new('dist/server/app.js');
    server.start(); // .run(['./dist/server/app.js']);
    // gulp.watch([Path.css], ['css']);
    // gulp.watch([Path.script],['script']);
    // gulp.watch([Path.image], ['image']);	
    // gulp.watch([Path.template], ['template']);
    // gulp.watch([Path.index], ['index']);
    // gulp.watch([Path.serverBase + '/routes/**/*.js'],server.run);

    // gulp.watch([Path.serverPublic + '/template/**/*.html'], server.notify);
    // gulp.watch([Path.serverPublic + '/**/*.css'], server.notify);
    // gulp.watch([Path.serverPublic + '/template/**/*.js'],server.notify);
    // gulp.watch([Path.serverPublic + '/images/**/*'], server.notify);	
    // gulp.watch([Path.serverPublic + '/bower_components/**/*'], server.notify);
    // gulp.watch([Path.serverBase + '/routes/**/*.js'],server.run); 

});

gulp.task('client',['client:script','client:style','client:index']);

gulp.task('server',['server:script','server:other']);

// server

gulp.task('server:script',function() {
    return gulp.src('./src/server/**/*.js')
       // .pipe(jshint({esnext:true}))
        //.pipe(jshint.reporter('default'))
        .pipe(babel())
        //.pipe(concat())
        .pipe(gulp.dest('./dist/server/'));      
});

gulp.task('server:other',function() {
    
    // right now just copy everything over
    return gulp.src('./src/server/!(node_modules)**/*!(.js)')
        .pipe(gulp.dest('./dist/server/'));   
});


// client

gulp.task('client:index',function() {
    // random stuff client needs
    return gulp.src('./src/client/index.html')
        .pipe(gulp.dest('./dist/client/'));
});

gulp.task('client:script',function() {
    return gulp.src('./src/client/**/*.js')
        // lint before we transpile es6 to es5
        .pipe(jshint({esnext:true}))
        .pipe(jshint.reporter('default'))
        // transpile
        //.pipe(babel())
        // concat the transpiled files
        //.pipe(concat('main.js'))        
        // TODO: couldn't get this to work
        //.pipe(uglify('main.js'))
        .pipe(gulp.dest('./dist/client/'));
});

gulp.task('client:style',function() {
    return gulp.src('./src/client/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/client/'));
    
});


