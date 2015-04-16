import angular from 'angular';
import {NavComponent} from 'components/common/nav/nav.component';

export default angular.module('nav', [])
  .directive('acNav', NavComponent);
