import {HeroController} from './hero.controller';
import template from './hero.template.html';
import css from './hero.css';

function HeroComponent () {
  return {
    controller: HeroController,
    bindToController: true,
    scope: {},
    restrict: 'E',
    controllerAs: 'vm',
    template: template
  }
}

HeroComponent.$inject = [];

export {HeroComponent}
