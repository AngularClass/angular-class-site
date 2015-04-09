import angular from 'angular';
import from 'angular-ui-router';
import template from 'components/admin/admin.template.html!text';

function config($stateProvider){
  $stateProvider
    .state('admin', {
      url: '/admin',
      template: '<ac-admin></ac-admin>'
    });
}

config.$inject = ['$stateProvider'];

export default angular.module('admin', [
  'ui.router'
])
.config(config)
.directive('acAdmin', function(){
  return {
    restrict: 'E',
    template: template
  };
});
