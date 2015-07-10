import {config} from '../config/index';
import {Author} from '../api/author/author';

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({ secret: config.secrets.jwtSecret });

var CheckPassword = function(req, res, next){
  let candidate = req.body.password;

  Author.findOne({ email: req.body.email })
  .then(function(author){
    if (!author) {
      res.status(401).send('No account with that email');
      return;
    }

    return author.comparePassword(candidate)
      .then(function(match){
        if (!match) {
          return res.status(401).send('Email password combo doesn\'t work.');
        }
        req.author = author;
        next();
      })
      .catch(function(e){
        console.log('nooo')
        res.status(401).send('Wrong password');
      });
  })
  .catch(function(e){
    next(e);
  });
};

var Gatekeeper = function(){
  return compose()
    .use(function(req, res, next) {
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    .use(function(req, res, next){
      Author.findById(req.user._id)
      .exec(function(err, author) {
        if (err) {
          return next(err);
        }

        if (!author) {
          return res.status(401).send('Unauthorized');
        }

        delete req.user;
        req.author = author;
        next();
      });
    });
};

var sign = function(user){
  return jwt.sign(user, config.secrets.jwtSecret, { expiresInMinutes: 60 * 24 * 30 });
};

var CheckAdmin = function(){
  return compose()
    .use(Gatekeeper())
    .use(function(req, res, next){
      if (!config.roles[req.author.role]) {
        return res.status(403).send('Forbidden');
      }
      next();
    });
};

export {Gatekeeper, CheckAdmin, CheckPassword, sign};
