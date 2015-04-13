class BlogPostController {
  constructor($stateParams, $state, $q, Posts) {
    console.log('yooo')
    let url = `${$stateParams.date}/${$stateParams.slug}`;
    $q.when(Posts.getOnePublished(url))
      .then(post =>{
        this.post = post;
        console.log(post);
      })
      .catch(e =>{
        console.error(e);
      });
  }
}

BlogPostController.$inject = ['$stateParams', '$state','$q', 'Posts'];
export {BlogPostController};
