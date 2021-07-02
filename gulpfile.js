var gulp = require('gulp') ,
    sass = require('gulp-sass'),
    rename = require('gulp-rename');
    concat = require('gulp-concat');
    minify = require('gulp-minify');
    sync = require('browser-sync').create();
    cleanCSS = require('gulp-clean-css');
    replace = require('gulp-replace');
    del = require('del');
    browserSync = require('browser-sync').create();

const options = require("./package.json").options;

// Compile SCSS files and minify CSS files
gulp.task('sass', () => {
    return (gulp.src('assets/scss/theme.scss')
        .pipe(sass())
        .pipe(gulp.dest(options.assetDirectory + '/css'))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(options.assetDirectory + '/css/'))
        .pipe(sync.stream()));

});

gulp.task('watch', function(){

    browserSync.init({
        proxy: "http://localhost/" + options.links_front.dev,
        port: options.port + 1
    });
    gulp.watch('assets/css/sass/*.scss', gulp.series('sass'));

    gulp.watch(['*.html', 'assets/js/*.js', 'assets/css/*.css']).on('change', browserSync.reload);

    gulp.watch(['assets/css/sass/*.scss']).on('change', browserSync.reload);
});

// permet de demarer le gulp par default
gulp.task('default', gulp.series('sass', 'watch'));



