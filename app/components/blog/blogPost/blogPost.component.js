import {BlogPostController} from './blogPost.controller';
import template from './blogPost.template.html';
import './blogPost.css';

function BlogPostComponent () {
  return {
    controller: BlogPostController,
    bindToController: true,
    restrict: 'E',
    scope: {},
    controllerAs: 'vm',
    template: template
  };
}

BlogPostComponent.$inject = [];

export {BlogPostComponent};
