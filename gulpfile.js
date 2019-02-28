/*=========================================*/ 
/*= Перенос их галпа 3 в галп 4 ========== */
/*=========================================*/ 
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});
function javascript() {
    return gulp.src(jsSRC)
    .pipe(concat('devwp.js'))
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest(jsdist));
  }

// Static Server + watching scss/html files
gulp.task('serve', gulp.parallel('sass', function() {

    browserSync.init({
        browser: 'chrome',
        server: "./app"
    });

    gulp.watch("app/sass/*.scss", gulp.series('sass'));
    gulp.watch('app/js/*.js')
    .on('change', browserSync.reload)
    .on('unlink', function(path, stats) {
        console.log(path);
    });
    gulp.watch("app/*.html").on('change', browserSync.reload);
}));


gulp.task('default', gulp.series('serve'));