import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './admin.template.html';
import AuthModule from './auth/index';
import PostsModule from './posts/index';
import CreatPostModule from './createPost/index';

function config($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('admin', {
      url: '/admin',
      template: '<ac-admin></ac-admin>',
      abstract: true,
      authenticate: true
    });

  $urlRouterProvider.when('/admin', '/admin/posts');
}

function run($state, $rootScope, Auth) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if (!Auth.isLoggedIn() && toState.authenticate) {
      event.preventDefault();
      $state.go('login');
    }
  });
}

run.$inject = ['$state', '$rootScope', 'Auth'];


config.$inject = ['$stateProvider', '$urlRouterProvider'];

export default angular.module('admin', [
  'ui.router',
  AuthModule.name,
  PostsModule.name,
  CreatPostModule.name
])
.config(config)
.run(run)
.directive('acAdmin', function(){
  return {
    restrict: 'E',
    template: template
  };
});
