import {postRouter} from 'api/post/index';
import {authorRouter} from 'api/author/index';
import {config} from 'config/index';
import {log} from 'components/logger';
// import Gatekeeper from 'server/auth/index';
var tag = 'api/index.js';
var fs = require('fs');
var express = require('express');
var API = express.Router();
var colors = require('colors');

API.use('/post', postRouter);
API.use('/author', authorRouter);

API.use(function(err, req, res, next) {
  let status = 500;

  if (err.message === 'No authorization token was found') {
    status = 401;
  }
  log.error(tag, err);

  res.status(status).send(err.message);
});

export default API;
