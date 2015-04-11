import {Post} from 'api/post/post';

var _ = require('lodash');

var controller = {
  mountId: function(req, res, next, id) {
    console.log(id);
    req.blog_post = id;
    next();
  },

  getAll: function(req, res, next) {
    res.json({ name: 'scott' });
  },

  getOne: function(req, res, next) {
    res.json({ post: req.blog_post });
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
