'use strict';
import angular from 'angular';

export default angular.module('services', [])
  .constant('Root', 'http://myapi/v1/api')
  .factory('Urls', ['Root', function(Root) {
    return {
      admin: `${Root}/admin`,
      blog: `${Root}/blog`,
      auth: `${Root}/auth`
    };
  }]);
