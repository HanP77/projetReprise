const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const filter = require('gulp-filter');
const babel = require('gulp-babel');
// const pkg = require('./package.json');

gulp.task('sass', function() {
    return gulp.src('src/sass/style.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

  gulp.task('minify-css', ['sass'], function() {
    return gulp.src('dist/css/style.css')
      .pipe(cleanCSS({
        compatibility: 'ie8'
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

  gulp.task('minify-js', function() {
    return gulp.src('src/js/main.js')
      .pipe(cleanCSS({
        compatibility: 'ie8'
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('dist/js/main.js'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

  gulp.task('copy', function() {
    gulp.src([
        'node_modules/bootstrap/dist/**/*',
        '!**/npm.js',
        '!**/bootstrap-theme.*',
        '!**/*.map'
      ])
      .pipe(gulp.dest('vendor/bootstrap'))
  })

  gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: './'
      },
    })
  })

  gulp.task('es6', () => {
    return gulp.src('src/js/main.js')
        .pipe(babel({
          presets: ['es2015']
}))
        .pipe(gulp.dest('build/js'));
 });

  gulp.task('dev', ['browserSync', 'sass', 'minify-css' , 'minify-js'], function() {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('dist/css/*.css', ['minify-css']);
    gulp.watch('dist/js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('src/js/*.js', browserSync.reload);
  });
  