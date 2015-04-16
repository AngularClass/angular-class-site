import angular from 'angular';
import {BlogListComponent} from 'components/blog/blogList/blogList.component';

export default angular.module('blogList', [])
  .directive('acBlogList', BlogListComponent);
