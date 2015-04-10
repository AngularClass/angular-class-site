'use strict';
import angular from 'angular';
import Hero from 'components/home/hero/index';
import from 'angular-ui-router';

function config ($stateProvider){
  $stateProvider
    .state('home', {
      url: '/',
      template: '<ac-home></ac-home>'
    });
}

config.$inject = ['$stateProvider'];

export default angular.module('home', [
  'ui.router',
  Hero.name
])
.config(config)
.directive('acHome', function(){
  return {
    template: `
      <ac-nav></ac-nav>
      <ac-hero></ac-hero>
      <ac-content></ac-content>
      <ac-footer></ac-footer>
    `,
    restrict: 'E'
  };

});



