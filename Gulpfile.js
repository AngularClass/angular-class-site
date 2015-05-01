var gulp    = require('gulp'),
    replace = require('gulp-html-replace'),
    run     = require('gulp-run');
    BS      = require('browser-sync'),
    sync    = require('run-sequence'),
    nodemon = require('gulp-nodemon'),
    remove  = require('gulp-rimraf'),
    fs      = require('fs'),
    gIf     = require('gulp-if'),
    file    = require('gulp-file'),
    reload  = BS.reload;

var serverStarted = false;

var root = './app';

var paths = {
  js: [root + '/components/**/*.js', root + '/config.js'],
  html: [root + '/components/**/*.html', root + '/index.html']
};

gulp.task('serve', function() {
  BS({
    port: 9000,
    open: false,
    proxy: "http://localhost:4500"
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.js, reload);
  gulp.watch(paths.html, reload);
});

gulp.task('clean', function(){
  return gulp.src('app/app.js')
    .pipe(remove());
});

gulp.task('build', ['clean'], function(){

  return gulp.src('app/index.html')
    .pipe(replace({
      'js': 'app.js'
    }))
    .pipe(gulp.dest('./app'))
    .pipe(run('jspm bundle-sfx components/index app/app.js'))
});

gulp.task('nodemon', function (done) {
  return nodemon({
    script: 'server/index.js',
    'ignore': ['node_modules/**/*.**', 'app/**/*.**']
  }).on('start', function(){
    if (!serverStarted){
      done();
      serverStarted = true;
    }
  })
});

gulp.task('default', function(){
  sync('nodemon', 'serve', 'watch');
});

function checkForSecretsFile(file){
  return !!file === false
}
