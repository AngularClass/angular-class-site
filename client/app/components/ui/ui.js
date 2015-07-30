import angular from 'angular';
import {niceImg} from './niceImg/niceImg';

export const ui = angular.module('ui', [])
  .directive('niceImg', niceImg);
