import angular from 'angular';
import {PostsComponent} from './posts.component';
import {PostsService} from './posts.service';

function config($stateProvider){
  $stateProvider
    .state('admin.posts', {
      url: '/posts',
      template: '<ac-posts></ac-posts>',
      authenticate: true
    });
}

config.$inject = ['$stateProvider'];

export default angular.module('admin.posts', [])
  .config(config)
  .directive('acPosts', PostsComponent)
  .factory('Posts', PostsService);

