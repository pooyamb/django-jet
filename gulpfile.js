require('es6-promise').polyfill();

var gulp = require('gulp'),
    browserify = require('browserify'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge-stream'),
    postcss = require('gulp-postcss'),
    pxtorem = require('postcss-pxtorem'),
    autoprefixer = require('autoprefixer'),
    shell = require('gulp-shell'),
    babelify    = require("babelify");

var cssProcessors = [
    autoprefixer(),
    pxtorem({
        rootValue: 14,
        replace: false,
        propWhiteList: []
    })
];

gulp.task('scripts', function() {
    return browserify('./jet/static/jet/js/src/main.js')
        .transform(babelify.configure({
            presets: ["@babel/preset-env"]
        }))
        .bundle()
        .on('error', function(error) {
            console.log(error.toString())
            this.emit('end')
        })
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./jet/static/jet/js/build/'));
});

gulp.task('styles', function() {
    return gulp.src('./jet/static/jet/css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', function(error) {
            console.log(error.toString())
            this.emit('end')
        })
        .pipe(postcss(cssProcessors))
        .on('error', function(error) {
            console.log(error.toString())
            this.emit('end')
        })
        .pipe(sourcemaps.write('./'))
        .on('error', function(error) {
            console.log(error.toString())
            this.emit('end')
        })
        .pipe(gulp.dest('./jet/static/jet/css'))
        .on('error', function(error) {
            console.log(error.toString())
            this.emit('end')
        });
});

gulp.task('vendor-styles', function() {
    return merge(
        gulp.src('./node_modules/perfect-scrollbar/css/perfect-scrollbar.css'),
        gulp.src('./node_modules/alertifyjs/build/css/alertify.min.css'),
        gulp.src('./node_modules/alertifyjs/build/css/themes/default.min.css'),
    )
    .pipe(postcss(cssProcessors))
    .on('error', function(error) {
        console.error(error.toString())
    })
    .pipe(concatCss('vendor.css', {
        rebaseUrls: false
    }))
    .on('error', function(error) {
        console.error(error.toString())
    })
    .pipe(cleanCSS())
    .on('error', function(error) {
        console.error(error.toString())
    })
    .pipe(gulp.dest('./jet/static/jet/css/'))
    .on('error', function(error) {
        console.error(error.toString())
    });
});

gulp.task('vendor-translations', function() {
    return merge(
        gulp.src(['./node_modules/select2/dist/js/i18n/*.js'])
            .pipe(gulp.dest('./jet/static/jet/js/i18n/select2/'))
    )
});

gulp.task('locales', gulp.series(shell.task('python manage.py compilemessages', { quiet: true })));

gulp.task('build', gulp.parallel('scripts', 'styles', 'vendor-styles', 'vendor-translations', 'locales'));

gulp.task('watch', function() {
    gulp.watch('./jet/static/jet/js/src/**/*.js', gulp.series('scripts'));
    gulp.watch('./jet/static/jet/css/**/*.scss', gulp.series('styles'));
    gulp.watch(['./jet/locale/**/*.po', './jet/dashboard/locale/**/*.po'], gulp.series('locales'));
});

gulp.task('default', gulp.series('build', 'watch'));
