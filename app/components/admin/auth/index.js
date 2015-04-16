import angular from 'angular';
import {AuthComponent} from 'components/admin/auth/auth.component';
import {Auth, AuthInterceptor} from 'components/admin/auth/auth.service';

function config($stateProvider, $httpProvider){
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<ac-auth></ac-auth>'
    });

  $httpProvider.interceptors.push('AuthIntercptor');
}

config.$inject = ['$stateProvider', '$httpProvider'];

export default angular.module('auth', [])
  .config(config)
  .factory('Auth', Auth)
  .factory('AuthIntercptor', AuthInterceptor)
  .directive('acAuth', AuthComponent);

