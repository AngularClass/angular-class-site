import angular from 'angular';
import {NavComponent} from './nav.component';

export default angular.module('nav', [])
  .directive('acNav', NavComponent);
