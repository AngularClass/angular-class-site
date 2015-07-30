import angular from 'angular';
import _ from 'lodash';

const limit = 100;
const url = `${_API.root}/posts`;

const postFactory = ($http, $q) => {
  let posts = [];

  const getState = () => {
    return posts;
  };

  const getAllPost = ()=> {
    return $http({
      url,
      method: 'GET'
    })
    .then(({data})=> {
      posts = data;
    });
  };

  const getPost = (slug)=> {
    const post = _.find(post, {slug});

    if (post) {
      return $q.when(post);
    } else {
      return $http({
        url: `${url}/${slug}`,
        method: 'GET',
        params: {slug: true}
      })
      .then(resp => resp.data);
    }
  }

  return {getAllPost, getState, getPost};
}

export const posts = angular.module('post', [])
  .factory('Posts', postFactory);
