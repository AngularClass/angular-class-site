import angular from 'angular';
import {PostsComponent} from 'components/admin/posts/posts.component';
import {PostsService} from 'components/admin/posts/posts.service';

function config($stateProvider){
  $stateProvider
    .state('admin.posts', {
      url: '/posts',
      template: '<ac-posts ></ac-posts>'
    });
}

config.$inject = ['$stateProvider'];

export default angular.module('admin.posts', [])
  .config(config)
  .directive('acPosts', PostsComponent)
  .factory('Posts', PostsService);

