import angular from 'angular';
import {BlogListComponent} from './blogList.component';

export default angular.module('blogList', [])
  .directive('acBlogList', BlogListComponent);
