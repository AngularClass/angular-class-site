import {PostsController} from './posts.controller';
import template from './posts.template.html';
import css from './posts.css';

function PostsComponent () {
  return {
    controller: PostsController,
    bindToContoller: true,
    restrict: 'E',
    controllerAs: 'vm',
    template: template
  };
}

export {PostsComponent};
