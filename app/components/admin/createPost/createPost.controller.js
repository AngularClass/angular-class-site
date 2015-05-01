import _ from 'lodash';

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code, ['javascript', 'html']).value;
  }
});

class CreatePostController {
  constructor(CreatePost, Posts, $stateParams, $q, $mdToast, Upload){
    this.Posts = Posts;
    this.$mdToast = $mdToast;
    this.Upload = Upload;

    this.buttonText = {
      'postState': 'publish',
      'preview': 'preview'
    };

    $q.when(Posts.getOne($stateParams.id))
      .then(post =>{
        this.newPost = angular.copy(post);

        if (post.state === 'published') {
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

  upload(files){
    if (files && files.length) {
      files.forEach((file, index) =>{
        this.Upload.upload({
          url: '/api/v1/author/upload',
          fields: { username: 'Scott' },
          file: file
        })
        .progress(evt =>{
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progess', progressPercentage);
        })
        .success((data, status, headers, config)=>{
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          this.newPost.image = data.url;
        });
      });
    }
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

  changePostState(){
    if (this.newPost.state === 'published') {
      this.newPost.state = 'draft';
    } else {
      this.newPost.state = 'published';
      this.newPost.publishedDate = Date.now();
    }

    this.save();
  }

  save(){
    let save;

    if (this.newPost._id) {
      save = this.Posts.save(this.newPost);
    } else {
      this.newPost.raw = marked(this.newPost.markdown);
      save = this.Posts.save(this.newPost, true);
    }

    save.then(post =>{
      this.newPost = post;

      if (this.newPost.state === 'published') {
        this.buttonText.postState = 'unpublish';
      } else {
        this.buttonText.postState = 'publish';
      }
      this.$mdToast.show(
        this.$mdToast.simple()
          .content('✓ Post saved')
          .position('bottom right')
          .hideDelay(3000)
      );
    });
  }
}

CreatePostController.$inject = ['CreatePost', 'Posts', '$stateParams', '$q', '$mdToast', 'Upload'];

export {CreatePostController};
