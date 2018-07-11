
//1.给所有的css添加前缀(浏览器的兼容性)

var gulp=require("gulp");
var autoprefixer=require("gulp-autoprefixer");

gulp.task('css',function(){
	return gulp.src("app/css/**/*.css")
	//pipe()方法：前一次的结果会当成后一次的输入
	           .pipe(autoprefixer())
	           .pipe(gulp.dest("dist"));
})

//2.合并压缩CSS文件、JS文件、HTML文件

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

 