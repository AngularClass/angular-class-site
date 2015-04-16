import {config} from 'config/index';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  firstName: {
    type: String
  },

  lastName: {
    type: String
  },

  displayName: {
    type: String
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  bio: String,

  handles: {
    twitter: {
      type: String,
      trim: true
    }
  },

  role: {
    type: String,
    default: 'writer'
  }
});

AuthorSchema.pre('save', function(next) {
    var author = this;

    // only hash the password if it has been modified (or is new)
    if (!author.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(config.secrets.salt, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(author.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            author.password = hash;
            next();
        });
    });
});

AuthorSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise( (resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) =>{
      if (err) {
        console.log('errr', err);
        reject(err);
        return;
      }
      resolve(isMatch);
    });
  });

};

var Author = mongoose.model('author', AuthorSchema);

export {Author};
