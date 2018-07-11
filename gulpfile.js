//1、测试：输出helloworld
var gulp = require('gulp');

gulp.task('hello', function() {
	console.log('Hello World!');
});

//2、将sass转化成css
var sass = require("gulp-sass");
//gulp.task('sass', function() {
//	return gulp.src("app/scss/styles.scss")
//		.pipe(sass())
//		.pipe(gulp.dest("app/css"))
//})
////3、监听效果
//
//gulp.task('watch', function(){
//gulp.watch('app/scss/**/*.scss', ['sass']);
//})

//4、实时刷新效果
var browserSync = require('browser-sync');

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	})
})
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
})

//5.合并JS文件

var gulp = require('gulp');
var useref = require('gulp-useref');
gulp.task('useref', function(){
return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

//6压缩JS文件


var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
gulp.task('useref', function(){
return gulp.src('app/*.html')
   
    .pipe(uglify()) // 压缩javascript文件
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

//7.压缩CSS文件

var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
//var cssnano = require('gulp-cssnano');
gulp.task('useref', function() {
	return gulp.src('app/*.html')
	     .pipe(useref())
	     // 只有当它是一个Javascript文件时才会出现
		.pipe(gulpIf('*.js', uglify()))
		// 只有当它是一个CSS文件时才会出现
		.pipe(gulpIf('*.css', minifyCSS()))
		.pipe(gulp.dest('dist'))
});

gulp.task('useref', function() {

return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

//8.处理图片文件：
var imagemin = require('gulp-imagemin');
//gulp.task('images', function() {
//	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
//		.pipe(imagemin())
//		.pipe(gulp.dest('dist/images'))
//});

//9.减少图片的重复压缩 

var cache = require('gulp-cache');
gulp.task('images', function() {
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
});

//10.自动清理旧文件

var del = require('del');

gulp.task('clean', function(callback) {
	del('dist');
	return cache.clearAll(callback);
})

gulp.task('clean:dist', function(callback) {
	del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});

//11.整合
//第一条线路
var runSequence = require('run-sequence');

gulp.task('gulpdemo', function(callback) {
	runSequence(['sass', 'browserSync', 'watch'],
		callback
	)
})

gulp.task('build', function(callback) {
	runSequence('clean:dist', ['sass', 'useref', 'images'],
		callback
	)
})
//第二条线路