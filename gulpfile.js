
// Gulp configurations to reload browser when files change
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jasmine = require('gulp-jasmine-livereload-task');

gulp.task('browserSync', function() {
    browserSync.init({
       proxy: "localhost:3000",
       open: false
    });
});

gulp.task('reloadJasmine', jasmine({
    files: ['src/inverted-index.js','jasmine/spec/*.js']
}));

gulp.task('start', ['reloadJasmine','browserSync'], function() {
    gulp.watch('src/public/css/*.css', browserSync.reload);
    gulp.watch('src/views/*.html', browserSync.reload);
    gulp.watch('src/**/*.js', browserSync.reload);
});