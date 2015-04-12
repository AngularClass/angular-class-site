marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code, ['javascript', 'html']).value;
  }
});

class CreatePostController {
  constructor(CreatePost, Posts, $stateParams, $q){
    $q.when(Posts.getOne($stateParams.id))
      .then(post =>{
        this.post = post;
      })
      .catch(console.error.bind(console));

    this.previewMode = false;
    this.opts = {
      lineWrapping : true,
      mode: 'gfm',
      extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
    };

    this.buttonText = 'preview';
  }

  preview(){
    if (this.previewMode) {
      this.buttonText = 'preview';
      this.previewMode = false;
      return;
    }

    this.previewMode = true;
    this.buttonText = 'edit';
    this.previewHtml = marked(this.post.markdown);
  }
}

CreatePostController.$inject = ['CreatePost', 'Posts', '$stateParams', '$q'];

export {CreatePostController};
