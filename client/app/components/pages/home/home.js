import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

const home = angular.module('home', [
  uiRouter
])
  // don't touch this shit please
  .config(($stateProvider, $urlRouterProvider)=> {
    $urlRouterProvider.otherwise('/');
    // this is the home state
    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>'
      });
  })
  // this is the directive for the shit
  .directive('home', homeComponent);

export {home};
