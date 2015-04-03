import {HeroController} from 'components/home/hero/hero.controller';
import template from 'components/home/hero/hero.template.html!text';
import from 'components/home/hero/hero.css!';

function HeroComponent () {
  return {
    controller: HeroController,
    bindToContoller: true,
    restrict: 'E',
    controllerAs: 'vm',
    template: template
  }
}

HeroComponent.$inject = [];

export {HeroComponent}
