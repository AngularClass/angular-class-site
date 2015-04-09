import angular from 'angular';
import from 'angular-material';
import from 'angular-ui-router';

import Home from 'components/home/index';
import Common from 'components/common/index';
import Blog from 'components/blog/index';
import Admin from 'components/admin/index';

console.log(Admin)

function config($urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise('/');
  // $locationProvider.html5Mode(true);
}

config.$inject = ['$urlRouterProvider', '$locationProvider'];

angular.module('AngularClass', [
  'ngMaterial',
  'ngAria',
  'ngAnimate',
  'ui.router',
  Home.name,
  Common.name,
  Blog.name,
  Admin.name
])
.config(config);

export default {};
