
class PostsController {
  constructor(Posts){
    Posts.getAll()
      .then(posts => {
        console.log(posts);
        this.posts = posts;
      });
  }
}

PostsController.$inject = ['Posts'];

export {PostsController};
