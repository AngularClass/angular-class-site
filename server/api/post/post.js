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
  }
});

// Create the slug for the url that all blog posts need
// so if title = Learn Angular step by step
// slug will be: learn-angular-step-by-step
PostSchema.pre('save', function(next){
  let post = this;
  post.slug = slug(post.title);
  next();
});


PostSchema.virtual('url').get(function() {
  let date = this.publishedDate || this.createdAt;

  let urlDate = moment(date);

  let formatted = urlDate.format('DD[/]MM[/]YYYY');

  // formatted results in the format '2012/10/'

  console.log(formatted);
  return formatted + this.slug;
});

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

  let postsPromises = props.map(function(prop) {
    return savePost(prop);
  });

  return Promise.all(postsPromises);
};

var Post = mongoose.model('post', PostSchema);

export {Post};
