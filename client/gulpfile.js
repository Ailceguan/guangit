// 加载插件
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    del = require('del'),
    htmlminify = require('gulp-html-minify'),
    zip = require('gulp-zip'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');


gulp.task('clean',function(){
  del('./dist');
});

gulp.task('help',function(){
  console.log('gulp clean  ：  清空dist目录');
  console.log('gulp ')
});
// scss
gulp.task('scss', function() {
    return gulp.src('src/sass/**/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'           // 配置输出方式,默认为nested
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'sass task complete'}));
});

// script
gulp.task('script', function() {
  return gulp.src('src/js/*.js')
    // .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'script task complete'}));
});
// images
gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'images task complete'}));
});
// 默认任务
gulp.task('default', function() {
    gulp.start('script', 'scss', 'images');
});

// 监视
gulp.task('watch', function() {
  // 监视css文件的改动

  gulp.watch('src/sass/**/*.scss', ['scss']);   // 实时监听sass文件变动,执行sass任务
  // 监视js文件的改动
  gulp.watch('src/js/*.js', ['script']);
  // 监视images文件的改动
  gulp.watch('src/images/*', ['images']);
  // 创建浏览器自动刷新服务器
  livereload.listen();
  // dist目录下文件有改动就会浏览器刷新
  gulp.watch(['dist/**/*.*']).on('change', livereload.changed);
});
