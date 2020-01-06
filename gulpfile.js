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
    revAll = require('gulp-rev-all'),
    clean = require('gulp-clean')

// 复制无需打包的库文件到dist
const copyUrl = [ 'src/assets/js/lib/**/*' ]
gulp.task('copy', () =>
    gulp.src(copyUrl).pipe(gulp.dest('dist/assets/js/lib'))
)
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
})
//scss编译
gulp.task('generateScss', function () {
    return gulp.src([ 'src/assets/css/style.scss' ])
    .pipe(sass())
    .pipe(plumber())
    .pipe(autoprefixer({
        overrideBrowserslist: [ 'last 2 versions' ],
        cascade: false
    }))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/assets/css')),
        // 插件css
        gulp.src([ 'src/assets/js/plugins/**/*.scss' ])
        .pipe(sass())
        .pipe(plumber())
        .pipe(autoprefixer({
            overrideBrowserslist: [ 'last 2 versions' ],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/assets/js/plugins'))
})
// 替换md5后缀
gulp.task('rev', () => {
    return gulp.src([ 'dist/**' ])
    .pipe(revAll.revision({
        dontRenameFile: [ 'html', '/lib' ]
        // debug: true
    }))
    .pipe(gulp.dest('./dist/'))
})
const babelSrc = [ 'src/**/*.es6' ]
// babel
gulp.task('generateBabel', () =>
    gulp.src(babelSrc)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: [ '@babel/env' ]
    }))
    .pipe(gulp.dest('dist'))
)
// ts编译
const tsUrl = [ 'src/assets/js/**/*.ts' ]
gulp.task('generateTs', () => gulp.src(tsUrl)
    .pipe(ts({declaration: true}))
    .pipe(gulp.dest('dist/assets/js'))
)

// 清空生成目录
gulp.task('clean', () =>
    gulp.src('dist', {read: false, allowEmpty: true})
    .pipe(clean({force: true}))
)
// 默认任务
gulp.task('default',
    gulp.series(
        'clean',
        gulp.parallel(
            'generateScss',
            'generateTs',
            'generateBabel',
            'generateHtml'
        ),
        'rev',
        'copy'
    )
)
//监听
gulp.task('watch', function () {
    gulp.watch([ 'src/**/*' ], gulp.parallel('default'))
    // 监听src内所有html
    // gulp.watch('src/**/*.html', 'html')
    // // 监听src内所有css
    // gulp.watch('src/**/*.scss', 'scss')
    // // 监听src内所有ts
    // gulp.watch('src/**/*.ts', 'ts')
    // // 监听src内所有es6
    // gulp.watch('src/**/*.es6', 'babel')
})
