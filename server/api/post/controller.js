import {Post} from 'api/post/post';

var _ = require('lodash');

var controller = {
  mountId: function(req, res, next, id) {
    Post.findById(id, function(err, post) {
      if (err) return next(err);

      post = post || {};
      req.post = post;
      next();
    });
  },

  getAll: function(req, res, next) {
    Post.find()
    .populate('author', 'displayName _id')
    .exec(function(err, posts){
      if (err){
        return next(err);
      }
      res.json(posts);
    });
  },

  getOne: function(req, res, next) {
    res.json(req.post);
  },

  createOne: function(req, res, next) {
    var newPost = req.body;
    Post.make(newPost)
      .then(res.json.bind(res))
      .catch(next.bind(next));
  },

  editOne: function(req, res, next) {
    res.send();
  },

  removeOne: function(req, res, next) {
    res.send();
  }
};

export {controller};
