import angular from 'angular';
import {HeroComponent} from './hero.component';
import vivus from 'vivus';

export default angular.module('hero', [
])
  .directive('acHero', HeroComponent)
  .directive('acLogo', function($timeout){
    return {
      template:`
        <div>
        <div ng-hide="done">
        <svg version="1.1" id="logo" x="0" y="0" width="350" height="550" viewBox="0, 0, 350, 550" enable-background="new 0 0 200 200" >
          <path d="M174.062,40 L174.438,147.062 L70.562,185 C56.604,140.828 42.646,93.655 28.708,49.477 C28.711,49.476 28.713,49.475 28.716,49.474 C28.889,49.425 29.063,49.376 29.236,49.327 L29.452,49.241 C56.374,109.038 137.42,66.541 174.062,40 z" fill="none" stroke="#fff"/>
          <path d="M174.062,40 C198.514,57.832 225.635,73.49 255.411,80.115 C271.545,83.705 289.873,83.253 303.888,73.534 C311.577,68.202 316.525,61.023 320.994,52.976 C321.634,53.26 321.411,53.163 321.663,53.272 C308.138,96.171 294.651,142.082 281.188,185 L174.438,147.062 L174.062,40 z" fill="none" stroke="#fff"/>
          <path d="M174.438,147.062 L7.062,206.062 L33.438,425.312 L174.562,502.938 L316.438,424.312 L342.938,204.938 L174.438,147.062 z" fill="none" stroke="#fff" id="path14"/>
          <path d="M342.938,205.003 L174.062,147.062 L174.062,502.938 L315.601,424.055 L342.938,205.003 z" fill="none" stroke="#fff" id="path16"/>
          <path d="M7.062,206.118 L32.55,425.174 L174.062,502.938 L174.062,147.062 L7.062,206.118 z" fill="none" stroke="#fff" id="path18"/>
          <path d="M209.312,324.188 L174.312,251.062 L143.438,324.188 L209.188,324.188 z M222.688,354.938 L129.938,354.938 L109.188,406.812 L70.562,407.562 L174.062,177.312 L281.188,407.562 L245.438,407.562 L222.688,354.938 z" fill="none" stroke="#fff" id="path20"/>
          <path d="M174.062,177.312 L174.312,251.188 L209.312,324.312 L174.188,324.312 L174.062,354.938 L222.688,354.938 L245.438,407.562 L282.438,408.312 L174.188,177.312 z" fill="none" stroke="#fff" id="path22" display="none"/>
        </svg>
        </div>
      <img src="images/acLogo.svg" ng-if="reallydone" class="fx-fade-normal fx-easing-strong">
      </div>
      `,
      link: function(scope, el, attr) {
        // scope.animating = true;
        new vivus('logo', {type: 'delayed', duration: 200, start: 'autostart'}, function(){
          $timeout(function(){
            scope.done = true;
          },0)
          .then(function(){
            $timeout(function(){
              scope.reallydone = true;
            },0)
          })
        })
      },

      scope:{},

      restrict: 'E'
    };
  })
