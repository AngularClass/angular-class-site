var mongoose = require('mongoose');

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
    required: true,
    unique: true
  },

  text: {
    type: String,
    required: true,
    unique: true
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
  ]
});

PostSchema.statics.make = function makePost(props) {
  return new Promise((resolve, reject) => {
    let newPost = new this(props);

    newPost.save(function(err, post){
      if (err) {
        return reject(err);
      }

      resolve(post);
    });
  });
};

var Post = mongoose.model('post', PostSchema);

export {Post};
