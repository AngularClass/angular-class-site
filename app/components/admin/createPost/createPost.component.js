import {CreatePostController} from 'components/admin/createPost/createPost.controller';
import template from 'components/admin/createPost/createPost.template.html!text';
import css from 'components/admin/createPost/createPost.css!';

function CreatePostComponent () {
  return {
    controller: CreatePostController,
    bindToContoller: true,
    restrict: 'E',
    scope: {},
    controllerAs: 'vm',
    template: template,
    link: function(scope, ele, attr, ctrl){
      ctrl.element = ele;
      // let textArea = ele.find('div');
      // let editor = new CodeMirror(textArea[0], {
      //   showCursorWhenSelecting: true,
      //   mode: "gfm"
      // });

      // editor.on('change', function(){
      //   console.log(editor.getValue());
      // });
    }
  };
}

export {CreatePostComponent};
