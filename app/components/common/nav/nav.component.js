import {NavController} from 'components/common/nav/nav.controller';
import template from 'components/common/nav/nav.template.html!text';

function NavComponent () {
  return {
    controller: NavController,
    bindToContoller: true,
    restrict: 'E',
    template: template
  }
}

NavComponent.$inject = [];

export {NavComponent}
