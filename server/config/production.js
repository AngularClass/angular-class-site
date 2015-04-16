'use strict';

let config = {
  db: {
    url: process.env.MONGOLAB_URI
  },
  port: process.env.PORT || 4500,
  onStart: function(){
    console.log(`on port: ${this.port}`);
  }
};

export default config;
