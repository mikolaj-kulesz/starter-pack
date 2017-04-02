var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  htmlReplace = require('gulp-html-replace'),
  htmlMin = require('gulp-htmlmin'),
  coffee = require('gulp-coffee'),
  es = require('event-stream'),
  babel = require('gulp-babel'),
  clean = require('gulp-clean'),
  pug = require('gulp-pug');

function errorLog(error) {
  console.error(error);
}

gulp.task('html', function () {

  var htmlFromPug = gulp.src('src/templates/pug/*.pug').pipe(pug());
  var html = gulp.src('src/templates/html/*.html');

  return es.merge(htmlFromPug, html)
    .pipe(htmlReplace({
      'css': 'css/style.css',
      'js': 'js/script.js'
    }))
    .pipe(htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}));
});

/*gulp.task('pug', function () {
  return gulp.src('src/templates/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}));
});*/

gulp.task('styles', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(concat('style.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('jsECMAScript5', function () { //tak źle pokazuje sourcemaps
  return gulp.src('src/js/ECMAScript5/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('scriptES5.js'))
    .pipe(uglify())
    .on('error', errorLog)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('jsECMAScript6', function () {
  return gulp.src('src/js/ECMAScript6/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ 
      presets: ['es2015'] 
    }))
    .pipe(concat('scriptES6.js'))
    .pipe(uglify())
    .on('error', errorLog)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('coffee', function () {
  return gulp.src('src/js/coffee/**/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(concat('coffee.js'))
    .pipe(uglify())
    .on('error', errorLog)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function () {
  return gulp.src('src/img/**/*')
    .pipe(changed('build/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
});

gulp.task('clean', function() {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

// =================================
gulp.task('watch', function () {
  gulp.watch('src/js/ECMAScript5/**/*.js', ['jsECMAScript5']);
  gulp.watch('src/js/ECMAScript6/**/*.js', ['jsECMAScript6']);
  gulp.watch('src/js/coffee/**/*.coffee', ['coffee']);
  gulp.watch('src/templates/html/**/*.html', ['html']);
  gulp.watch('src/templates/pug/**/*.pug', ['html']);
})

gulp.task('default', ['html', 'styles', 'jsECMAScript5', 'jsECMAScript6', 'coffee', 'img', 'browserSync', 'watch']);


/*gulp.task('scripts', function () { //tak źle pokazuje sourcemaps
  var jsFromCoffee = gulp.src('src/js/coffee/*.coffee').pipe(coffee());
  var jsECMAScript5 = gulp.src('src/js/ECMAScript5/*.js');
  var jsECMAScript6 = gulp.src('src/js/ECMAScript6/*.js').pipe(babel({ presets: ['es2015'] }));

  return es.merge(jsFromCoffee, jsECMAScript5, jsECMAScript6)
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(uglify())
    .on('error', errorLog)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});*/
