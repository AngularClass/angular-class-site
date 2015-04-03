import angular from 'angular';
import from 'angular-material';
import from 'angular-ui-router';

import Home from 'components/home/index';
import Common from 'components/common/index';

function config($urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  console.log('here')
}

config.$inject = ['$urlRouterProvider'];

angular.module('AngularClass', [
  'ngMaterial',
  'ngAria',
  'ngAnimate',
  Home.name,
  Common.name
])
.config(config);

export default {};
