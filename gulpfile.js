var url = 'localhost:8888'; // Local dev URL. Change as needed.

var gulp   = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    imageMin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');
    pump = require('pump');
    babel = require('gulp-babel');

gulp.task('bs', function() {
    browserSync.init({
        proxy: url
    });
});

gulp.task('styles', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'))
        .pipe(reload({ stream: true }));
});

gulp.task('compress', function (cb) {
  pump([
      gulp.src('./scripts/**/*.js'),
      babel({
                presets: ['env']
            }),
      concat('main.min.js'),
      uglify(),
      gulp.dest('./public/scripts'),
      reload({stream:true}),
    ],
    cb
  );
});

gulp.task('images', function () {
    return gulp.src('./images/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./images'));
});

gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('./scripts/**/*.js', ['compress']);
    gulp.watch('./**/*.html', reload);
});

gulp.task('default', ['styles', 'compress', 'images', 'bs', 'watch']);