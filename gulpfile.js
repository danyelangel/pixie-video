(function () {
  var gulp = require('gulp'),
      plumber = require('gulp-plumber'),
      rename = require('gulp-rename'),
      babel = require('gulp-babel'),
      nodemon = require('gulp-nodemon');

  gulp.task('server', function() {
    nodemon({
      script: 'dist/app.js',
      ext: 'es6',
      env: { 'NODE_ENV': 'development' },
      tasks: ['scripts']
    })
  });

  gulp.task('scripts', function () {
    return gulp.src('src/**/*.es6')
      .pipe(rename(function (filePath) {
        filePath.extname = '.js';
      }))
      .pipe(plumber({
        errorHandler: function (error) {
          console.log(error.message);
          this.emit('end');
      }}))
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('dist/'));
  });

  gulp.task('default', ['scripts', 'server'], function () {
  });
}());