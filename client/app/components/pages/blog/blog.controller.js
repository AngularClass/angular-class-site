class BlogController {
  constructor(Posts, $location) {
    let {start = 0 , end = 10} = $location.search();

    this.Posts = Posts;
    this.getPosts(start, end);
  }

  getPosts(start, end) {
    console.log(start, end);
    this.Posts.getAllPost()
      .then(()=> {
        this.posts = this.Posts.getState().slice(start, end + 1);
      });
  }
}

BlogController.$inject = ['Posts', '$location'];

export {BlogController};
