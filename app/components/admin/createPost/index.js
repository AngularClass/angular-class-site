import angular from 'angular';
import {CreatePostComponent} from './createPost.component';
import {CreatePost} from './createPost.service';
import uiCodeMirror from 'angular-ui-codemirror';
import ngUpload from 'ng-file-upload';

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

export default angular.module('admin.createPost', [
  'ui.codemirror',
  'ngFileUpload'
])
  .config(config)
  .directive('acCreatePost', CreatePostComponent)
  .factory('CreatePost', CreatePost);

