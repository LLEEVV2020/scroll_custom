/*=========================================*/ 
/*= Перенос их галпа 3 в галп 4 ========== */
/*=========================================*/ 
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var babel       = require("gulp-babel");

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});
// Compile babel into js 
gulp.task('js', function() {
    return gulp.src(["app/js/libs.js", "app/js/main.js"])
        .pipe(babel())
        .pipe(gulp.dest("app/babel"));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.parallel('sass', 'js', function() {

    browserSync.init({
        browser: 'chrome',
        server: "./app"
    });

    gulp.watch("app/sass/*.scss", gulp.series('sass'));
    gulp.watch('app/js/*.js', gulp.series('js'))
        .on('change', browserSync.reload)
        .on('unlink', function(path, stats) {
            console.log(path);
        });
    gulp.watch("app/*.html").on('change', browserSync.reload);
}));


gulp.task('default', gulp.series('serve'));