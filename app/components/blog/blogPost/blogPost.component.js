import {BlogPostController} from 'components/blog/blogPost/blogPost.controller';
import template from 'components/blog/blogPost/blogPost.template.html!text';
import 'components/blog/blogPost/blogPost.css!';

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
