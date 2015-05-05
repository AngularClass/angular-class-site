import {AuthController} from 'components/admin/auth/auth.controller';
import template from 'components/admin/auth/auth.template.html!text';
import css from 'components/admin/auth/auth.css!';
import ramjet from 'ramjet';

function AuthComponent () {
  return {
    controller: AuthController,
    bindToContoller: true,
    restrict: 'E',
    controllerAs: 'vm',
    link: function(scope, element, attr, ctrl){
      // let temp = angular.element(element.children()[0]);
      // let loginForm = temp.children()[1];
      // let circle = temp.children()[0];
      // ramjet.hide(circle);

      // ctrl.showForgotPassword = () =>{
      //   ramjet.transform(loginForm, circle, {
      //     done(){
      //       ramjet.show(circle);
      //     }
      //   });

      //   ramjet.hide(loginForm);
      //   loginForm = angular.element(loginForm);
      //   loginForm.css('display', 'none');

      // };
    },
    template: template
  };
}

export {AuthComponent};
