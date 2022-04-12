const gulp = require('gulp');
const rename = require('gulp-rename');
// const sourcemaps = require('gulp-sourcemaps')
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

/* --- compile SCSS --- */
gulp.task('compile-sass', () => {
  return gulp
    .src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

/* --- minify HTML --- */
gulp.task('minify-html', () => {
  return gulp
    .src('src/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest('dist/'));
});

/* --- minify CSS --- */
gulp.task('minify-css', () => {
  const processors = [autoprefixer];
  return gulp
    .src('src/css/*.css')
    .pipe(postcss(processors))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

/* --- minify JavaScript --- */
gulp.task('minify-js', () => {
  return gulp.src('src/js/*.js').pipe(uglify()).pipe(gulp.dest('dist/js'));
});

/* --- move img & images to dist --- */
gulp.task('move-img', () => {
  return gulp.src(['src/img/*', 'src/img/**/*']).pipe(gulp.dest('dist/img'));
});
gulp.task('move-images', () => {
  return gulp
    .src(['src/images/*', 'src/images/**/*'])
    .pipe(gulp.dest('dist/images'));
});

/* --- watch SCSS --- */
gulp.task('watch', () => {
  gulp.watch('src/sass/*.scss', gulp.parallel('compile-sass'));
});

/* --- 同步執行全部任務 --- */
gulp.task(
  'build',
  gulp.parallel(
    'compile-sass',
    'minify-css',
    'minify-js',
    'move-images',
    'move-img'
  )
);
gulp.task('dev', gulp.parallel('watch'));
