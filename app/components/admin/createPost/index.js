import angular from 'angular';
import {CreatePostComponent} from 'components/admin/createPost/createPost.component';
import {CreatePost} from 'components/admin/createPost/createPost.service';
import from 'ui-codemirror';

function config($stateProvider){
  $stateProvider
    .state('admin.createPost', {
      url: '/create-post/:id',
      params: {
        id: 0
      },
      template: '<ac-create-post></ac-create-post>'
    });
}

config.$inject = ['$stateProvider'];

export default angular.module('admin.createPost', ['ui.codemirror'])
  .config(config)
  .directive('acCreatePost', CreatePostComponent)
  .factory('CreatePost', CreatePost);

