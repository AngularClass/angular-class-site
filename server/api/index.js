import {postRouter} from 'api/post/index';
import {authorRouter} from 'api/author/index';
// import Gatekeeper from 'server/auth/index';

var express = require('express');
var API = express.Router();

API.use('/post', postRouter);
API.use('/author', authorRouter);

API.use(function(err, req, res, next) {
  let status = 500;

  if (err.message === 'No authorization token was found') {
    status = 401;
  }

  console.log('loggger', err.message);
  res.status(status).send(err.message);
});

export default API;
