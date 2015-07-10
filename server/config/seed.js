import {Author} from '../api/author/author';
import {config} from './index';
import {Post} from '../api/post/post';

var _ = require('lodash');
var slug = require('slug');

let cleanAuthor = function() {
  return new Promise(function(resolve, reject) {
    Author.remove({}, function(err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

let cleanPosts = function(){
  return new Promise(function(resolve, reject) {
    Post.remove({}, function(err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

let cleanDb = function(){
  return Promise.all([cleanPosts(), cleanAuthor()]);
};

let createAuthors = function(){
  let newAuthor = {
    first_name: 'scott',
    last_name: 'moss',
    displayName: 'Scott Moss',
    email: 'scott@angularclass.com',
    password: 'ballin35$$',
    bio: 'Scott likes to ...',
    handles: {
      twitter: '@scotups'
    },

    role: 'admin'
  };

  let lameAuthor = {
    first_name: 'Justice',
    last_name: 'Beju',
    displayName: 'Beju Beju',
    email: 'nonadmin@angularclass.com',
    password: 'test123',
    bio: 'Beju likes food',
    handles: {
      twitter: '@beju'
    },

    role: 'author'
  };

  return new Promise(function(resolve, reject) {
    Author.create([newAuthor, lameAuthor], function(err, ...authors){
      if (err) {
        return reject(err);
      }
      resolve(...authors);
    });
  });
};

let batchPosts = function(posts){
  // return new Promise(function(resolve, reject) {
  //   Post.create(posts, function(err, ...newPosts){
  //     if (err) {
  //       return reject(err);
  //     }

  //     resolve(...newPosts);
  //   });
  // });


};

let createPosts = function(authors){
  let samplePost = {
    title: 'Your first Post',
    state: 'published',
    publishedDate: Date.now(),
    raw:
      `
        <h3 id="first-blog-post">First blog post</h3>
        <p>This is your frst blog post. It has <a href="http://google.com">links</a> and stuff</p>
      `,
    markdown:`### First blog post

This is your frst blog post. It has [links](http://google.com) and stuff`
  };

  let posts = _.map(authors, author =>{
    let copyPost = _.cloneDeep(samplePost);
    copyPost.author = author._id;
    copyPost.title = `This is ${author.displayName} first post`;
    copyPost.slug = slug(copyPost.title).toLowerCase();
    return copyPost;
  });

  return Post.make(posts);
  // return batchPosts(posts);
};

export default function(){
  return cleanDb()
  .then(createAuthors)
  .then(createPosts)
  .then(function(posts){
    // console.log('Seeded db with %s posts', posts.length);
  })
  .catch(function(e){
    console.log('error', e);
  });
}
