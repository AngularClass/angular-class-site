import {CreatePostController} from 'components/admin/createPost/createPost.controller';
import template from 'components/admin/createPost/createPost.template.html!text';
import css from 'components/admin/createPost/createPost.css!';
import _ from 'lodash';

function CreatePostComponent () {
  return {
    controller: CreatePostController,
    bindToController: true,
    restrict: 'E',
    replace: true,
    scope: {},
    controllerAs: 'vm',
    template: template,
    link: function(scope, ele, attr, ctrl){
      ctrl.element = ele;
      ctrl.stats = {};
      let process = function(markdown){
        let raw = marked(markdown);
        var count = angular.element(raw).text().split(' ').length;
        ctrl.stats.wordCount = count;
        ctrl.stats.readTime = Math.ceil(count/210);
      }

      let getRaw = _.throttle(process, 500);

      scope.$watch(()=>{
        return ctrl.newPost.markdown;
      }, (fresh, old)=>{
        console.log(fresh)
        if (fresh && fresh !== old) {
          getRaw(fresh);
        }
      })
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
