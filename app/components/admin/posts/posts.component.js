import {PostsController} from 'components/admin/posts/posts.controller';
import template from 'components/admin/posts/posts.template.html!text';
import css from 'components/admin/posts/posts.css!';

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
