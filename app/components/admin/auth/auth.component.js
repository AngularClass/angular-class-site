import {AuthController} from 'components/admin/auth/auth.controller';
import template from 'components/admin/auth/auth.template.html!text';
import from 'components/admin/auth/auth.css!';

function AuthComponent () {
  return {
    controller: AuthController,
    bindToContoller: true,
    restrict: 'E',
    controllerAs: 'vm',
    template: template
  };
}

export {AuthComponent};
