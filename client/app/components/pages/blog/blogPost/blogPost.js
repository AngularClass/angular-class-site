import angular from 'angular';

export const blogPost = angular.module('blogPost', [])
  .config(($stateProvider) => {
    $stateProvider
      .state('post', {
        url: '/blog/:date/:slug',
        template: `<pre>{{ post | json }}</pre>`,
        controller: function(post, $scope) {
          $scope.post = post;
        },

        resolve: {
          post: function(Posts, $stateParams) {
            const {slug} = $stateParams;
            return Posts.getPost(slug);
          }
        }
      })
  });
