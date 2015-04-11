'use strict';

var System = require('es6-module-loader').System;

System.paths.babel = 'file:' + require.resolve('babel-core/browser.js');
System.transpiler = 'babel';

System.baseURL = 'file:' + process.cwd() + '/server/';

System.import('server')
  .then(function(m) {
    m.run(__dirname);
  })
  .catch(function(e){
    console.log(e);
  });
