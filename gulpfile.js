
// Gulp configurations to reload browser when files change
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jasmine = require('gulp-jasmine-livereload-task');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

gulp.task('browserSync', function() {
    browserSync.init({
       server: {
            baseDir: "src",
            index: 'views/index.html',
            port: 3000
        }
    });
});

gulp.task('reloadJasmine', jasmine({
    files: ['src/inverted-index.js','jasmine/spec/*.js']
}));

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/testfiles'));
});


gulp.task('start', ['reloadJasmine','browserSync'], function() {
    gulp.watch('src/public/css/*.css', browserSync.reload);
    gulp.watch('src/views/*.html', browserSync.reload);
    gulp.watch('src/**/*.js', browserSync.reload);
});