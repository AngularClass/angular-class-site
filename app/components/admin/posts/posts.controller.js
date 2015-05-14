
class PostsController {
  constructor(Posts, $mdDialog, $scope){
    this.loading = true;
    this.Posts = Posts;
    this.$mdDialog = $mdDialog;
    this.batch = {};


    Posts.getAll()
      .then(posts => {
        this.posts = posts;
      })
      .finally(()=>{
        this.loading = false;
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

PostsController.$inject = ['Posts', '$mdDialog', '$scope'];

export {PostsController};
