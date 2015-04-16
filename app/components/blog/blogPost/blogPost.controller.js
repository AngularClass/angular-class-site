class BlogPostController {
  constructor($stateParams, $state, $q, Posts) {
    let url = `${$stateParams.date}/${$stateParams.slug}`;
    $q.when(Posts.getOnePublished(url))
      .then(post =>{
        this.post = post;
      })
      .catch(e =>{
        console.error(e);
      });
  }
}

BlogPostController.$inject = ['$stateParams', '$state','$q', 'Posts'];
export {BlogPostController};
