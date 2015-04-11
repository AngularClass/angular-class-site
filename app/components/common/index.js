import Nav from 'components/common/nav/index';
import Services from 'components/common/services/index';
import angular from 'angular';

export default angular.module('common', [
  Nav.name,
  Services.name
]);
