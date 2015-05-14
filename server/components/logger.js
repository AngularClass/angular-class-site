import {config} from 'config/index';
var _ = require('lodash');


let logger = function(tag, ...argr){
  if (config.logging) {
    console.log(tag, ...args);
  }
};

let log = {
  print: function(tag, ...args) {
    tag = tag.toUpperCase();
    logger(tag.cyan, args);
  },

  error: function(tag, error){
    tag = tag.toUpperCase();
    logger(tag.underline.red, error.stack.red);
  },

  info: function(tag, message){

    tag = tag.toUpperCase();

    if (_.isObject(message)) {
      message = JSON.stringify(message, null, 2);
    }

    logger('☞ '.magenta, tag.magenta, message.magenta);
  }
};

export {log};
