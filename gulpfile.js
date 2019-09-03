const { series, src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');

const dev = './dev';
const pub = './pub';

function images(cb) {
    return src(`${dev}/assets/*`)
        .pipe(imagemin())
        .pipe(dest(`${pub}/assets`));
}

exports.images = images;

function css(cb) {
    const plugins = [
        autoprefixer(),
        cssnano()
    ];
    return src(`${dev}/*.css`)
        .pipe(postcss(plugins))
        .pipe(dest(pub));
}

exports.css = css;

function js(cb) {
    return src(`${dev}/*.js`)
        .pipe(uglify())
        .pipe(dest(pub));
}

exports.js = js;

exports.default = series(exports.images, exports.css, exports.js);