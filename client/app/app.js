import 'angular-material/angular-material.min.css';
import angular from 'angular';
import ngMaterial from 'angular-material';
import ngAria from 'angular-aria';
import ngAnimate from 'angular-animate';
import uiRouter from 'angular-ui-router';
import {ui} from './components/ui/ui';
import appComponent from './app.component';
import {home} from './components/pages/home/home';
import {blog} from './components/pages/blog/blog';
import {posts} from './components/util/posts';

angular.module('AngularClass', [
  ngAnimate,
  ngAria,
  ngMaterial,
  uiRouter,
  ui.name,
  home.name,
  blog.name,
  posts.name
])
.config(($locationProvider, $mdThemingProvider) => {
  $locationProvider.html5Mode({enabled: true, requireBase: true});
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('yellow');
})

.directive('app', appComponent);
