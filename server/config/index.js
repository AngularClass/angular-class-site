'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import devConfg from 'config/development';
import setSecrets from 'config/_secrets';

var _ = require('lodash');

if (process.env.NODE_ENV === 'development') {
  setSecrets();
}

let config = {
  env: process.env.NODE_ENV,
  db: {
    seed: false
  },
  port: 4500,
  onStart: function(){
    console.log(`on port: ${this.port}`);
  },

  logging: true,
  secrets: {
    PRERENDER_TOKEN: process.env.PRERENDER_TOKEN
  }
};

config = _.merge({}, config, devConfg);

export {config};
