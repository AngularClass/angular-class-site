import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {blogComponent} from './blog.component';
import {postCardComponent} from './postCard.component';
import {blogPost} from './blogPost/blogPost';

const blog = angular.module('blog', [
  uiRouter,
  blogPost.name
])
  .config(($stateProvider) => {
    $stateProvider
      .state('blog', {
        url: '/blog',
        template: '<blog></blog>'
      })
  })

  .directive('blog', blogComponent)
  .directive('postCard', postCardComponent);

export {blog};
