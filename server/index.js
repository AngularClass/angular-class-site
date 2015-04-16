'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var System = require('es6-module-loader').System;

System.paths.babel = 'file:' + require.resolve('babel-core/browser.js');
System.transpiler = 'babel';

System.baseURL = 'file:' + process.cwd() + '/server/';

if ('testing' === process.env.NODE_ENV) {
  module.exports = System;
} else {
  System.import('server')
  .then(function(module) {
    var app = module.app;
    app.listen(app.get('port'), function(){
      console.log('listening on port %s', app.get('port'));
    });
  })
  .catch(function(e){
    console.log(e);
  });

}
