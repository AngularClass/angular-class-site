import './blog.styl';
import {BlogController} from './blog.controller';
import template from './blog.html';
import {Component} from '../../../common/component';

const blogComponent = () => {
  return new Component({
    template,
    controller: BlogController
  });
}

export {blogComponent};
