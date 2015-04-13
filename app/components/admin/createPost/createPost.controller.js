marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code, ['javascript', 'html']).value;
  }
});

class CreatePostController {
  constructor(CreatePost, Posts, $stateParams, $q){
    this.buttonText = {
      'postState': 'publish',
      'preview': 'preview'
    };

    $q.when(Posts.getOne($stateParams.id))
      .then(post =>{
        this.post = post;
        this.newPost = {
          markdown: this.post.markdown,
          title: this.post.title
        };

        if (this.post.state === 'published') {
          this.buttonText.postState = 'unpublish';
        }
      })
      .catch(console.error.bind(console));

    this.previewMode = false;
    this.opts = {
      lineWrapping : true,
      mode: 'gfm',
      extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},
      tabSize: 4
    };
  }

  preview(){
    if (this.previewMode) {
      this.buttonText.preview = 'preview';
      this.previewMode = false;
      return;
    }

    this.previewMode = true;
    this.buttonText.preview = 'edit';
    this.newPost.raw = marked(this.newPost.markdown);
  }
}

CreatePostController.$inject = ['CreatePost', 'Posts', '$stateParams', '$q'];

export {CreatePostController};
