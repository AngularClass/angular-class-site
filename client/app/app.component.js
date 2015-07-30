import './app.styl';
import {Component} from './common/component';
import template from './app.html';

const appComponent = () => {
  return new Component({template})
};

export default appComponent;
