// Bejsik setup
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var del = require('del');

// Styles tesk
/*
1. preberi .css datoteke
2. precisti CSS
3. zdruzi css v en fajl
4. zapisi styles.css v /dist mapo
*/

gulp.task('styles', function() {
    return gulp.src('app/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});

//Less task
gulp.task('less', function() {
    return gulp.src('app/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('less.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});

//Clean task
gulp.task('clean', function(cb) {
    return del(['dist/*'], cb)
})

//Images tesk
gulp.task('images', function() {
    return gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

//Script Task
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});

//Watch tesk
/*
Opravilo naj preverja spremembe v izvornih datotekah
*/
gulp.task('watch', function() {
    gulp.watch('app/css/*.css', gulp.series('styles'));
    gulp.watch('app/less/*.less', gulp.series('less'));
    gulp.watch('app/css/*.js', gulp.series('scripts'));
    gulp.watch('app/img/*', gulp.series('images'));
});

// Difolt tesk
gulp.task('default', gulp.series('clean', 'less', 'styles', 'scripts', 'images', 'watch'));
