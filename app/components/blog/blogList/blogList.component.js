import {BlogListController} from 'components/blog/blogList/blogList.controller';
import template from 'components/blog/blogList/blogList.template.html!text';
import css from 'components/blog/blogList/blogList.css!';

function BlogListComponent () {
  return {
    controller: BlogListController,
    bindToContoller: true,
    restrict: 'E',
    controllerAs: 'vm',
    template: template
  }
}

BlogListComponent.$inject = [];

export {BlogListComponent};
