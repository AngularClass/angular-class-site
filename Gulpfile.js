var gulp    = require('gulp');
var sync    = require('run-sequence');
var BS      = require('browser-sync');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');
var fs      = require('fs');
var reload  = BS.reload;
require('shelljs/global');

var serverStarted = false;

var root = './app';

var paths = {
  js: [root + '/components/**/*.js', root + '/config.js'],
  html: [root + '/components/**/*.html', root + '/index.html'],
  css: [root + '/components/**/*.css'],
  styl: [root + '/components/**/*.styl'],
  entry: [root + '/components/index.js'],
  out: root
};

gulp.task('serve', function() {
  BS({
    port: 9000,
    open: false,
    proxy: 'http://localhost:4500'
  });
});

gulp.task('watch', function() {
  gulp.watch([].concat(paths.js, paths.html, paths.css, paths.styl), ['webpack', reload]);
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

gulp.task('nodemon', function(done) {
  return nodemon({
    script: 'server/index.js',
    ignore: ['node_modules/**/*.**', 'app/**/*.**']
  }).on('start', function() {
    if (!serverStarted) {
      done();
      serverStarted = true;
    }
  })
});

gulp.task('default', function(done) {
  sync('nodemon', 'webpack', 'serve', 'watch', done);
});
