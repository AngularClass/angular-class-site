import _ from 'lodash';

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
        this.newPost = angular.copy(post);
        
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
      tabSize: 2
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
  
  save(){
    let savePost = _.partial(Posts.save, this.newPost);
    let save;
    
    if (this.newPost._id) {
      save = savePost();
    } else {
      save = savePost(true);
    }
    
    save.then(post =>{
      this.newPost = post;
    });
  }
}

CreatePostController.$inject = ['CreatePost', 'Posts', '$stateParams', '$q'];

export {CreatePostController};
