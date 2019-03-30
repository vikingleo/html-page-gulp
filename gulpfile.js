var gulp = require('gulp'),
    fileInclude = require('gulp-file-include'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify')

// 复制必须文件到dist
gulp.task('copy', function () {
    return gulp.src(['src/assets/**/*', '!./src/assets/scss/**', '!./src/assets/basic-style/**'])
        .pipe(gulp.dest('dist')), gulp.src('dist/**/*')
        .pipe(gulp.dest('dist'))
});
// html文件合成
gulp.task('fileInclude', function () {
    return gulp.src('src/pages/**/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(minify({
            comments: true
        }))
        .pipe(gulp.dest('dist'))
});
//scss编译
gulp.task('scss', function () {
    return gulp.src('src/assets/scss/*.scss')
        .pipe(sass())
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
});

//监听
gulp.task('watch', function () {
    // 监听src内所有html
    gulp.watch('src/**/*.html', gulp.series(['fileInclude', 'copy']));
    // 监听src内所有css
    gulp.watch('src/**/*.scss', gulp.series(['scss', 'copy']));
});
