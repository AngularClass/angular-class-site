import angular from 'angular';
import from 'angular-ui-router';
import template from 'components/admin/admin.template.html!text';
import AuthModule from 'components/admin/auth/index';

function config($stateProvider){
  $stateProvider
    .state('admin', {
      url: '/admin',
      template: '<ac-admin></ac-admin>',
      authenticate: true
    });
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


config.$inject = ['$stateProvider'];

export default angular.module('admin', [
  'ui.router',
  AuthModule.name
])
.config(config)
.run(run)
.directive('acAdmin', function(){
  return {
    restrict: 'E',
    template: template
  };
});
