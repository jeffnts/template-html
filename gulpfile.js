const gulp = require('gulp');
const browserSync = require('browser-sync');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');



gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('server-reload', function () {
    browserSync.reload();
});

gulp.task('sass', function () {
    return gulp.src('sass/main.sass')
        .pipe(sass({
            includePaths: ['sass'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(''))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(''));
});


gulp.task('watch', function () {
    gulp.watch('sass/*.sass', ['sass']);
    gulp.watch('*.html', ['server-reload']);
});
 
gulp.task('default', ['browser-sync', 'watch']);