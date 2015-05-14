import {NavController} from './nav.controller';
import template from './nav.template.html';

function NavComponent () {
  return {
    controller: NavController,
    bindToContoller: true,
    controllerAs: 'vm',
    restrict: 'E',
    template: template
  };
}

NavComponent.$inject = [];

export {NavComponent};
