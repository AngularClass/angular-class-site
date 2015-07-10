import {Post} from './post';
import {log} from '../../components/logger';

var _ = require('lodash');
var slug = require('slug');
var tag = 'post/controller';

var controller = {
  mountId: function(req, res, next, id) {
    if (req.query.slug) {
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
      post = post.toObject();
      res.json(post);
    });
  },

  createOne: function(req, res, next) {
    var newPost = req.body;

    newPost.author = req.author._id;

    log.info(tag, newPost);
    Post.make(newPost)
      .then(posts =>{
        log.info(tag, posts[0]);
        res.status(201).json(posts[0]);
      })
      .catch(next.bind(next));
  },

  editOne: function(req, res, next) {
    _.merge(req.post, req.body);

    req.post.save((err, post) =>{
      if (err) {
        return next(err);
      }

      res.status(201).json(post);
    });
  },

  removeOne: function(req, res, next) {
    req.post.remove((err, post) =>{
      if (err){
        return next(err);
      }

      res.json(post);
    })
  }
};

export {controller};
