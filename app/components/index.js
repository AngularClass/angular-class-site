'use strict';
import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import Home from 'components/home/index';
import Common from 'components/common/index';
import Blog from 'components/blog/index';
import Admin from 'components/admin/index';
import ngSanitize from 'angular-sanitize';

function config($urlRouterProvider, $locationProvider, $mdThemingProvider){
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);

  $mdThemingProvider.definePalette('myShit', {
    "50":  "#eceff1",
    "100": "#cfd8dc",
    "200": "#b0bec5",
    "300": "#90a4ae",
    "400": "#78909c",
    "500": "#607d8b",
    "600": "#546e7a",
    "700": "#455a64",
    "800": "#37474f",
    "900": "#263238",
    "A100": "#37474F",
    "A200": "#b0bec5",
    "A400": "#78909c",
    "A700": "#455a64",
    "contrastDefaultColor": "dark",
    "contrastDarkColors": "50 100 200 300",
    "contrastStrongLightColors": "400 500"
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('yellow')
    .backgroundPalette('myShit', {
      'hue-3': '800'
    })
    .dark()
}

config.$inject = ['$urlRouterProvider', '$locationProvider', '$mdThemingProvider'];

angular.module('AngularClass', [
  'ngMaterial',
  'ngAria',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  Home.name,
  Common.name,
  Blog.name,
  Admin.name
])
.config(config);

export default {};
