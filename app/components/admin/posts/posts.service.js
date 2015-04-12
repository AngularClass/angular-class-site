function PostsService($http, Urls) {
  let postsCache = new Map();

  return {
    getAll: getAll,
    getOne: getOne
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
      return post;
    } else {
      console.log('fresh');
      return $http.get(`${Urls.post}/${id}`)
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
