import angular from 'angular';
import {BlogPostComponent} from 'components/blog/blogPost/blogPost.component';

function config($stateProvider){
  $stateProvider
    .state('blogPost', {
      url: '/blog/:date/:slug',
      template: '<ac-blog-post></ac-blog-post>'
    });
}

config.$inject = ['$stateProvider'];

export default angular.module('blogPost', [])
  .config(config)
  .directive('acBlogPost', BlogPostComponent);
