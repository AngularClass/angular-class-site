var gulp    = require('gulp');
var sync    = require('run-sequence');
var BS      = require('browser-sync');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack-stream');
var fs      = require('fs');
var babel   = require('gulp-babel');
var reload  = BS.reload;
require('shelljs/global');

var serverStarted = false;

var root = './client';

var paths = {
  js: [root + '/app/**/*.js'],
  html: [root + '/app/**/*.html', root + '/index.html'],
  css: [root + '/apps/**/*.css'],
  styl: [root + '/app/**/*.styl'],
  entry: [root + '/app/app.js'],
  out: 'client_dist',
  server: {
    all: 'server/**/*.**',
    js: 'server/**/*.js',
    out: 'server_dist'
  }
};

gulp.task('reload', function() {
  gulp.src('')
    .pipe(reload());
});

gulp.task('serve', function() {
  BS({
    port: 9000,
    open: false,
    proxy: 'http://localhost:4500'
  });
});

gulp.task('watch', function() {
  gulp.watch([].concat(paths.js, paths.html, paths.css, paths.styl), ['webpack', reload]);
  gulp.watch(paths.html[1], ['copy', reload]);
});

gulp.task('ci', function(done) {
  var hasSecrets = test('-e', 'server/config/secrets.js');
  var isOnCloud = function() {
    return process.env.CI || process.env.HEROKU;
  };

  if (!hasSecrets || isOnCloud()) {
    var file = 'export default {}';
    fs.writeFileSync(__dirname + '/server/config/secrets.js', file);
  }

  if (isOnCloud()) {
    sync('webpack', done);
    return;
  }

  done();
});

gulp.task('webpack', function() {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.out));
});

gulp.task('build-server', function() {
  return gulp.src(paths.server.js)
    .pipe(babel({stage: 1}))
    .pipe(gulp.dest(paths.server.out));
});

gulp.task('reload-server', function(done) {
  sync('build-server', 'reload', done)
});

gulp.task('copy', function() {
  var filesToCopy = [].concat(
    root + '/index.html',
    root + '/images/**/*.**'
  );
  return gulp.src(filesToCopy, { base: 'client' })
    .pipe(gulp.dest(paths.out));
});

gulp.task('build', function(done) {
  sync('webpack', 'build-server', 'copy', done);
});

gulp.task('nodemon', function(done) {
  return nodemon({
    script: 'server_dist/server.js',
    ignore: [
      'node_modules/**/*.**',
      'client/**/*.**',
      'client_dist/**/*.**',
      'server_dist/**/*.**',
      'Gulpfile.js'
    ],
    tasks: ['reload-server']
  })
  .on('start', function() {
    if (!serverStarted) {
      done();
      serverStarted = true;
    }
  })
});

gulp.task('live', function(done) {
  sync('nodemon', 'serve', done);
});

gulp.task('default', function(done) {
  sync('build', 'live', 'watch', done);
});
