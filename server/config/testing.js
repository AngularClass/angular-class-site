'use strict';

let config = {
  db: {
    url: 'mongodb://localhost/ac-blog-test',
    seed: false
  },
  port: process.env.PORT || 4500,
  onStart: function(){
    console.log(`on port: ${this.port}`);
  },

  logging: false
};

export default config;
