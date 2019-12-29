var gulp = require('gulp'),
    fileInclude = require('gulp-file-include'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    ts = require('gulp-typescript'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector')

// 复制必须文件到dist
const copyImgUrl = ['src/assets/images']
const copyJsUrl = ['src/assets/js/*.js', 'src/assets/js/plugins']
const copyCss = ['src/assets/css/*.css']
gulp.task('copy', () =>
    gulp.src(copyImgUrl).pipe(gulp.dest('dist/assets')),
    gulp.src(copyJsUrl).pipe(gulp.dest('dist/assets/js')),
    gulp.src(copyCss).pipe(gulp.dest('dist/assets/css'))
);
// html文件合成
gulp.task('generateHtml', function () {
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
gulp.task('generateScss', function () {
    return gulp.src('src/assets/css/*.scss')
        .pipe(sass())
        .pipe(plumber())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        // .pipe(sourcemaps.write())
        .pipe(rev())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev'))
});
// 替换md5后缀
const revUrl = ['dist/rev/*.json', 'dist/*.html']
gulp.task('rev', () =>
    gulp.src(revUrl)
        .pipe(revCollector({ replaceReved: true }))
        .pipe(gulp.dest('dist'))
)
const babelSrc = ['src/**/*.es6']
// babel
gulp.task('generateBabel', () =>
    gulp.src(babelSrc)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // .pipe(rename())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev'))
);
// ts编译
const tsUrl = ['src/assets/js/**/*.ts']
gulp.task('generateTs', () => gulp.src(tsUrl)
    .pipe(ts({ declaration: true }))
    .pipe(rev())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev'))
)


// 生成html且替换css链接
gulp.task('html', gulp.series(['generateHtml', 'rev']))

// 生成带md5后缀带css文件，并且替换html的后缀
gulp.task('scss', gulp.series(['generateScss', 'rev']))

// 生成带md5后缀带css文件，并且替换html的后缀
gulp.task('babel', gulp.series(['generateBabel', 'rev']))

// 生成带md5后缀带css文件，并且替换html的后缀
gulp.task('ts', gulp.series(['generateTs', 'rev']))

// 默认任务
gulp.task('default', gulp.parallel(['scss', 'html', 'ts', 'babel', 'copy']))
//监听
gulp.task('watch', function () {
    // 监听src内所有html
    gulp.watch('src/**/*.html', gulp.series(['scss', 'html']));
    // 监听src内所有css
    gulp.watch('src/**/*.scss', gulp.series(['scss', 'html']));
    // 监听src内所有ts
    gulp.watch('src/**/*.ts', gulp.series(['ts', 'html']))
    // 监听src内所有es6
    gulp.watch('src/**/*.es6', gulp.series(['babel', 'html']))
});
