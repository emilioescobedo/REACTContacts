"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var babelify = require("babelify");

var config = {
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*/*',
		sass: './src/sass/*.scss',
		css: [
			'./src/css/*.css'
		],
		dist: './dist',
		mainJs: './src/main.js'
	}
};

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(babelify, {presets: ["react"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
	.pipe(concat('bundle.css'))
	.pipe(gulp.dest(config.paths.dist + '/css'));
});


gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'css']);