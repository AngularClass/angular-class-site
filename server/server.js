'use strict';

import {config} from 'config/index';
import API from 'api/index';
import components from 'components/index';

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

export function run (dir) {
  // mongoose.connect(config.dbUrl);

  if (config.db.seed) {

  }

  app.set('rootDir', dir);

  if ('devlopment' === config.env) {
    app.use(morgan());
  }

  app.use(express.static(`${app.get('rootDir')}/../app`));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  console.log(config.secrets)
  app.use(require('prerender-node').set('prerenderToken', config.secrets.PRERENDER_TOKEN));
  app.use('/v1/api', API);


  app.get('/*', function(req, res){
    let options = {
      root: path.join(app.get('rootDir'), '../app'),
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    res.sendFile('index.html', options);
  });

  app.listen(config.port, config.onStart.bind(config));
}
