'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var merge = require('event-stream').merge;
var rename = require('gulp-rename');
var del = require('del');
var concat = require('gulp-concat');
var path = require('path');
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var isProduction = (process.argv.indexOf('--production') > 0);

gulp.task('clean', function(cb) {
    del(['./app/*'], cb);
});

gulp.task('auth-js', function() {
    return merge(
        gulp.src([
            './src/js/chrome_ex_oauthsimple.js',
            './src/js/chrome_ex_oauth.js'
        ])
            .pipe(babel({
                presets: ['es2015', 'stage-1']
            }))
            .on('error', function(err) {
                console.log(err);
                this.emit('ent')
            })
            .pipe(gulpif(isProduction, uglify()))
            .pipe(concat('chrome_ex_oauth.min.js'))
            .pipe(gulp.dest('./app/js'))
    );
});

gulp.task('background-js', function() {
    var allFiles = './src/js/background.js';

    var bundler = browserify(allFiles);

    bundler.transform(babelify, {
        presets: ['es2015', 'stage-1']
    })

    return bundler.bundle()
        .on('error', function(err) {
            console.log(err);
            this.emit('ent');
        })
        .pipe(plumber())
        .pipe(source('background.min.js'))
        .pipe(gulpif(isProduction, buffer()))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('options-js', function() {
    var allFiles = './src/js/options/index.js';

    var bundler = browserify(allFiles);

    bundler.transform(babelify, {
        presets: ['es2015', 'stage-1', 'react']
    })

    return bundler.bundle()
        .on('error', function(err) {
            console.log(err)
            this.emit('ent');
        })
        .pipe(plumber())
        .pipe(source('options.min.js'))
        .pipe(gulpif(isProduction, buffer()))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest('./app/js'))
});

gulp.task('css', function() {
    return gulp.src('./src/css/style.css')
        .pipe(gulp.dest('./app/css'));
});

gulp.task('html', function() {
    return gulp.src('./src/html/*.html')
        .pipe(gulp.dest('./app'));
});

gulp.task('assets', function() {
    return gulp.src('./src/assets/*')
        .pipe(gulp.dest('./app/assets'));
});

gulp.task('config', function() {
    return gulp.src('./src/manifest.json')
        .pipe(gulp.dest('./app'));
});

gulp.task('build', ['config', 'auth-js', 'background-js', 'options-js', 'html', 'assets']);
