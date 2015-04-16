function PostsService($http, Urls) {
  let postsCache = new Map();
  let publishedPostsCache = new Map();
  return {
    getAll: getAll,
    getOne: getOne,
    getPublished: getPublished,
    getOnePublished: getOnePublished
  };

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
    if (post) {
      console.log('fromCache');
      return post || {};
    } else {
      console.log('fresh');
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
      console.log('fromCache');
      return post || {};
    } else {
      console.log('fresh');
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
