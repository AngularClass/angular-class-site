var gulp    = require('gulp'),
    BS      = require('browser-sync'),
    reload  = BS.reload;

var root = './app';

var paths = {
  js: root + '/components/**/*.js',
  html: [root + '/components/**/*.html', root + '/index.html']
};

gulp.task('serve', function() {
  BS({
    port: 9000,
    server: {
      baseDir: root
    }
  });

  gulp.watch(paths.js, [reload]);
  gulp.watch(paths.html, [reload]);
  gulp.watch(paths.stylus, [reload]);
});
