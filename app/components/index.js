import angular from 'angular';
import from 'angular-material';

import Home from 'components/home/index';
import Common from 'components/common/index';

angular.module('AngularClass', [
  'ngMaterial',
  'ngAria',
  'ngAnimate',
  Home.name,
  Common.name
]);

export default {};
