import {Author} from 'api/author/author';
import {sign} from 'auth/gatekeeper';

var _ = require('lodash');

var controller = {

  getAll: function(req, res, next) {
    Author.find()
    .lean()
    .exec(function(err, authors) {
      if (err) {
        return next(err);
      }
      res.json(authors);
    });
  },

  getOne: function(req, res, next) {
    res.json(req.author);
  },

  createOne: function(req, res, next) {
    var newAuthor = req.body;
    Author.make(newAuthor)
      .then(res.json.bind(res))
      .catch(next.bind(next));
  },

  editOne: function(req, res, next) {
    _.extend(req.author, req.body);

    req.author.save(function(err, saved) {
      if (err) {
        return next(err);
      }

      req.json(saved);
    });
  },

  removeOne: function(req, res, next) {
    res.send({name: 'yo'});
  },

  login: function(req, res, next) {
    var token = sign(req.author.id);
    res.json({ token: token });
  }
};

export {controller};
