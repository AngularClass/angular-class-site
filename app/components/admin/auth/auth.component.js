import {AuthController} from './auth.controller';
import template from './auth.template.html';
import css from './auth.css';
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
