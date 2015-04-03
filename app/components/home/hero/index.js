import angular from 'angular';
import {HeroComponent} from 'components/home/hero/hero.component';

export default angular.module('hero', [])
  .directive('acHero', HeroComponent);
