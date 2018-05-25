/* eslint-env node */
/* eslint no-undef: "error" */

var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
//var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync').create();
//var concat = require('gulp-concat');
//var butternut = require('gulp-butternut');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
// var iconfont = require('gulp-iconfont');
// var iconfontCss = require('gulp-iconfont-css');
// var runTimestamp = Math.round(Date.now()/1000);

/*// var babel = require('gulp-babel');*/
/*// var pump = require('pump');*/
/*var watch = require('gulp-watch');*/

//default task for gulp
gulp.task('default', [
	'copy-html',
	'lint',
	'styles',
], function() {
	gulp.watch('src/sass/**/*.scss', ['styles']);
	//gulp.watch('js/**/*.js', ['lint']);
	gulp.watch('./index.html', ['copy-html']);
	gulp.watch('dist/*.html').on('change', bs.reload);

	bs.init({
		server: {
			baseDir: './',
		},
	});
});

// distribution task for gulp
gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'lint',
	//'scripts-dist'
]);

// // create distribution scricpt task for gulp (minified,concated to an all minified file)
// gulp.task('scripts-dist', function() {
// 	gulp.src('src/js/**/*.js')
// 		.pipe(sourcemaps.init())
// 		.pipe(butternut(true))
// 		.pipe(concat('all.min.js'))
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest('./dist/js'));
// });

// copy html task for gulp
gulp.task('copy-html', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist/'));
});

// copy images task for gulp
gulp.task('copy-images', function() {
	return gulp.src('src/img/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});

// style task for gulp - create scss file abd put in dist folder
gulp.task('styles', function() {
	gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(bs.stream());
});

// eslint checks if js is ok config
gulp.task('lint', function () {
	return gulp.src(['src/js/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});
