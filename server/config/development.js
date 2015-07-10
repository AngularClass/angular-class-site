import secrets from './secrets';
var _ = require('lodash');

_.forEach(secrets, (secret, name) => {
  process.env[name] = secret;
});

let config = {

  db: {
    seed: true,
    url: 'mongodb://localhost/ac-blog'
  },

  port: process.env.PORT || 4500,

  onStart: function(){
    console.log(`on port: ${this.port}`);
  },

  logging: true
};

export default config;
