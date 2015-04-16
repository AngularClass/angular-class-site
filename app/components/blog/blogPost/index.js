import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {BlogPostComponent} from 'components/blog/blogPost/blogPost.component';

function config($stateProvider){
  $stateProvider
    .state('blogPost', {
      url: '/blog/:date/:slug',
      template: '<ac-blog-post></ac-blog-post>'
    });
}

config.$inject = ['$stateProvider'];

export default angular.module('blogPost', [
  'ui.router'
])
  .config(config)
  .directive('acBlogPost', BlogPostComponent);
