import angular from 'angular';
import from 'angular-ui-router';
import BlogList from 'components/blog/blogList/index';
import BlogPost from 'components/blog/blogPost/index';

function config($stateProvider){
  $stateProvider
    .state('blog', {
      url: '/blog',
      template: '<ac-blog></ac-blog>'
    });
}

config.$inject = ['$stateProvider'];

export default angular.module('blog', [
  'ui.router',
  BlogList.name,
  BlogPost.name
])
.config(config)
.directive('acBlog', function(){
  return {
    restrict: 'E',
    template: `
      <ac-nav></ac-nav>
      <ac-blog-list></ac-blog-list>
    `
  };
});
