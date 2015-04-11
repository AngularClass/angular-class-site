import {postRouter} from 'api/post/index';
import {authorRouter} from 'api/author/index';
// import Gatekeeper from 'server/auth/index';

var express = require('express');
var API = express.Router();

API.use('/post', postRouter);
API.use('/author', authorRouter);

API.use(function(err, req, res, next) {
  console.log('loggger', err.message);
  res.status(500);
});

export default API;
