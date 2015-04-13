import {Post} from 'api/post/post';

var _ = require('lodash');

var controller = {
  mountId: function(req, res, next, id) {
    if (req.query.slug) {
      console.log('slug!!!');
      Post.findBySlug(id)
        .then(post =>{
          req.post = post;
          next();
        })
        .catch(next.bind(next));
    } else {
      Post.findById(id, function(err, post) {
        if (err) return next(err);

        post = post || {};
        req.post = post;
        next();
      });
    }

  },

  getAll: function(req, res, next) {
    console.log(req.query);
    Post.find(req.query)
    .populate('author', 'displayName _id')
    .exec(function(err, posts){
      if (err){
        return next(err);
      }

      posts = _.map(posts, post => {
        return post.toObject();
      });
      res.json(posts);
    });
  },

  getOne: function(req, res, next) {
    let post = req.post;

    Post.populate(post, { path: 'author', select: 'displayName _id' }, function(err, post){
      if (err) return next(err);

      res.json(post.toObject());
    });
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
