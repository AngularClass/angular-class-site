'use strict';

let config = {
  db: {
    seed: true,
    url: 'mongodb://localhost/ac-blog-test'
  },
  port: process.env.PORT || 4500,
  onStart: function(){
    console.log(`on port: ${this.port}`);
  },

  logging: true
};

export default config;
