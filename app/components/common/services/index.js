'use strict';
import angular from 'angular';

export default angular.module('services', [])
  .constant('Root', 'http://localhost:4500/api/v1')
  .factory('Urls', ['Root', function(Root) {
    return {
      admin: `${Root}/admin`,
      post: `${Root}/post`,
      author: `${Root}/author`
    };
  }]);
