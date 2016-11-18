'use strict'

// Gulp configurations to reload browser when files change
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('start', ['browserSync'], () => {
    gulp.watch('src/css/**/*.css', browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('jasmine/spec/**/*.js', browserSync.reload);
});