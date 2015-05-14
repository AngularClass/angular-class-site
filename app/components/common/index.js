import Nav from './nav/index';
import Services from './services/index';
import angular from 'angular';

export default angular.module('common', [
  Nav.name,
  Services.name
]);
