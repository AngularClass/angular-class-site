/// <reference path="../typings/node/node.d.ts"/>
'use strict';

import {config} from './config/index';
import API from './api/index';
import {sitemap} from './components/index';
import seedDB from './config/seed';

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var app = express();


let dir = path.join(process.cwd(), 'server');
mongoose.connect(config.db.url);

if (config.db.seed) {
  seedDB();
}

app.set('rootDir', dir);
app.set('port', config.port);

if (config.env === 'development') {
  app.use(morgan('dev'));
}


app.use(express.static(`${app.get('rootDir')}/../client_dist`));

// app.use(multer({ dest: './uploads' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: './uploads/' }))
app.use(require('prerender-node').set('prerenderToken', config.secrets.prerender));
app.use('/api/v1', API);

app.get('/sitemap.xml', sitemap);
app.get('/*', function(req, res) {
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

// export {app};
