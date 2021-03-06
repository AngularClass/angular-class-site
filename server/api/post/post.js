import {log} from 'components/index';

var mongoose = require('mongoose');
var slug = require('slug');
var moment = require('moment');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    required: true,
    ref: 'author'
  },

  title: {
    type: String,
    required: true,
    unique: true
  },

  url: {
    type: String,
    unique: true,
    sparse: true
  },

  reads: {
    type: Number,
    default: 0
  },

  raw: {
    type: String,
    required: true
  },

  markdown: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  revisions: [String],

  categories: [
    { type: Schema.ObjectId, ref: 'category' }
  ],

  state: {
    type: String,
    default: 'draft'
  },

  slug: {
    type: String,
    required: true,
    unique: true
  },

  publishedDate: {
    type: Date
  },

  image: {
    type: String
  }
});

// Create the slug for the url that all blog posts need
// so if title = Learn Angular step by step
// slug will be: learn-angular-step-by-step
PostSchema.pre('validate', function(next){
  this.slug = slug(this.title).toLowerCase();

  if (this.state !== 'published') {
    next();
    return
  }

  this.url = `${moment(this.publishedDate).format('DD[-]MM[-]YYYY')}/${this.slug.toLowerCase()}`;
  next();
});


PostSchema.set('toObject', { getters: true, virtuals: true });

PostSchema.statics.make = function makePost(props) {
  let Post = this;

  let savePost = function(post){
    return new Promise(function(resolve, reject){
      let newPost = new Post(post);

      newPost.save(function(err, doc){
        if(err) return reject(err);

        resolve(doc);
      });
    });
  };

  if (!Array.isArray(props)) {
    props = [props];
  }

  let postsPromises = props.map(prop =>  savePost(prop));

  return Promise.all(postsPromises);
};

PostSchema.statics.findBySlug = function(slug){
  return new Promise((resolve, reject) => {
    this.findOne({ slug: slug }, function(err, post) {
      if (err) return reject(err);

      resolve(post);
    });
  });
};

PostSchema.set('toJSON', {
   virtuals: true
});

var Post = mongoose.model('post', PostSchema);

export {Post};
