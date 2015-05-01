function PostsService($http, Urls) {
  let postsCache = new Map();
  let publishedPostsCache = new Map();

  return {
    getAll: getAll,
    getOne: getOne,
    getPublished: getPublished,
    getOnePublished: getOnePublished,
    save: save,
    remove: remove
  };

  function remove(id){
    return $http({
      url: Urls.post + '/' + id,
      method: 'DELETE'
    })
    .then(resp =>{
      return resp.data;
    });
  }

  function save(post, makeOne=false){
    let promise;

    if (makeOne){
      promise = $http({
        method: 'POST',
        url: Urls.post,
        data: post
      });
    } else {

      post.updatedAt = Date.now();

      promise = $http({
        method: 'PUT',
        url: Urls.post + '/' + post._id,
        data: post
      });
    }

    return promise.then(res => res.data);
  }

  function getAll(){
    return $http.get(Urls.post)
      .then(function(resp){
        let posts = resp.data;
        posts.forEach(post =>{
          postsCache.set(post._id, post);
        });

        return posts;
      });
  }

  function getOne(id){
    let post = postsCache.get(id);

    if (!!id || post) {
      return post || {};
    } else {
      return $http.get(`${Urls.post}/${id}`)
        .then(resp =>{
          return resp.data;
        });
    }
  }

  function getPublished() {
    return $http({
      url: Urls.post + '?state=published',
      method: 'GET'
    })
    .then(function(resp){
      let posts = resp.data;
      posts.forEach(post =>{
        publishedPostsCache.set(post.url, post);
      });

      return posts;
    });
  }

  function getOnePublished(url) {
    let post = publishedPostsCache.get(url);
    if (post) {
      return post || {};
    } else {
      return $http.get(`${Urls.post}/${url.split('/')[1]}?slug=true`)
        .then(resp =>{
          return resp.data;
        });
    }
  }

  function removeOne(){

  }
}

PostsService.$inject = ['$http', 'Urls'];

export {PostsService};
