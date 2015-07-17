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
var source = require('vinyl-source-stream');

var isProduction = (process.argv.indexOf('--production') > 0);

gulp.task('clean', function(cb) {
    del(['./app/*'], cb);
});

gulp.task('js', function() {
    return merge(
        gulp.src([
            './src/js/chrome_ex_oauthsimple.js',
            './src/js/chrome_ex_oauth.js'
        ])
            .pipe(babel({stage:1}))
            .pipe(gulpif(isProduction, uglify()))
            .pipe(concat('chrome_ex_oauth.min.js'))
            .pipe(gulp.dest('./app/js')),

        gulp.src([
            './apikey.js',
            './src/js/background.js'
        ])
            .pipe(babel({stage:1}))
            .pipe(gulpif(isProduction, uglify()))
            .pipe(concat('background.min.js'))
            .pipe(gulp.dest('./app/js')),

        browserify('./src/js/options/index.js')
            .transform(babelify.configure({
                stage: 1,
                blacklist: ['useStrict']
            }))
            .bundle()
            .on('error', function(err) {console.log('Error: ' + err.message);})
            .pipe(source('options.min.js'))
            .pipe(gulp.dest('./app/js'))
    );
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

gulp.task('build', ['config', 'js', 'css', 'html', 'assets']);
