const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const header = require("gulp-header");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const filter = require("gulp-filter");
const babel = require("gulp-babel");
const concat = require("gulp-concat");


gulp.task('html', function() {
  return gulp.src('./src/**/**/*.html')
      .pipe(gulp.dest('./dist/'))
      .pipe(browserSync.reload({
          stream: true
      }));
});

gulp.task("sass", function() {
  return gulp
    .src("src/sass/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("minify-css", ["sass"], function() {
  return gulp
    .src("dist/css/style.css")
    .pipe(
      cleanCSS({
        compatibility: "ie8"
      })
    )
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("minify-js", function() {
  return gulp
    .src("src/**/*.js")
    .pipe(concat('all.js'))
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("dist/js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("copy", function() {
  gulp
    .src([
      "node_modules/bootstrap/dist/**/*",
      "!**/npm.js",
      "!**/bootstrap-theme.*",
      "!**/*.map"
    ])
    .pipe(gulp.dest("dist/vendor/bootstrap"));
    

  gulp
    .src([
      "node_modules/jquery/dist/jquery.js",
      "node_modules/jquery/dist/jquery.min.js"
    ])
    .pipe(gulp.dest("dist/vendor/jquery"));
    

  gulp
    .src(["node_modules/jquery.easing/*.js"])
    .pipe(gulp.dest("dist/vendor/jquery-easing"));

  gulp
    .src(["node_modules/magnific-popup/dist/*"])
    .pipe(gulp.dest("dist/vendor/magnific-popup"));

  gulp
    .src([
      "node_modules/font-awesome/**",
      "!node_modules/font-awesome/**/*.map",
      "!node_modules/font-awesome/.npmignore",
      "!node_modules/font-awesome/*.txt",
      "!node_modules/font-awesome/*.md",
      "!node_modules/font-awesome/*.json"
    ])
    .pipe(gulp.dest("dist/vendor/font-awesome"));
});

// Default task
gulp.task("default", ["html", "sass", "minify-css", "minify-js", "copy"]);

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task("es6", () => {
  return gulp
    .src("./babel/es6.js")
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(
      rename({
        basename: "es5"
      })
    )
    .pipe(gulp.dest("./babel/build/js"));
});

gulp.task(
  "dev",
  ["browserSync", "html","sass", "minify-css", "minify-js"],
  function() {
    gulp.watch("src/sass/*.scss", ["sass"]);
    gulp.watch("dist/css/*.css", ["minify-css"]);
    gulp.watch("dist/js/*.js", ["minify-js"]);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch("dist/**/*.html", browserSync.reload);
    gulp.watch("dist/css/*.css", browserSync.reload);
    gulp.watch("dist/js/*js", browserSync.reload);
  }
);
