import {BlogListController} from './blogList.controller';
import template from './blogList.template.html';
import css from './blogList.css';

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
