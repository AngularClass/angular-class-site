
class PostsController {
  constructor(Posts, $mdDialog){
    this.Posts = Posts;
    this.$mdDialog = $mdDialog;

    Posts.getAll()
      .then(posts => {
        console.log(posts);
        this.posts = posts;
      });
  }

  remove(id){
    let confirm = this.$mdDialog.confirm({
      title: 'Hold up homie',
      content: 'Are you sure you want to delete this post? It will be gone forever!',
      ok: 'Yes',
      cancel: 'Nope'
    });

    this.$mdDialog.show(confirm)
      .then(() =>{
        this.Posts.remove(id)
          .then(() =>{
            this.posts = this.posts.filter(post =>{
              return post._id !== id;
            });
          });
      })
      .catch(()=>{
        this.$mdDialog.hide();
      })
      .finally(()=>{
        confirm = '';
      });

  }
}

PostsController.$inject = ['Posts', '$mdDialog'];

export {PostsController};
