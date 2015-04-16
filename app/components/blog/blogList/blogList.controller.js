class BlogListController {
  constructor(Posts, $q){
    $q.when(Posts.getPublished())
      .then(posts =>{
        this.posts = posts;
        console.log(this.posts);
      })
      .catch(console.error.bind(console));
  }
}

BlogListController.$inject = ['Posts', '$q'];

export {BlogListController};
