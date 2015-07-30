import {Component} from '../../../common/component';
const template = `
  <md-card class="post-card">
    <div class="post-img">
      <img src="http://lorempixel.com/g/400/200" alt="" nice-img>
    </div>
    <div class="post-content">
      <h3 class="title">{{ ::vm.post.title }}</h3>
    </div>
    <md-divider inset></md-divider>
    <div class="post-footer">
      <div class="author">
        <h4>By {{ ::vm.post.author.displayName }}</h4>
        <div class="actions">
          <md-button class="share" ng-click="vm.share(vm.post, $event)">share</md-button>
          <md-button class="read" ng-click="vm.read(vm.post.url)">read</md-button>
        </div>
      </div>
    </div>
  </md-card>
`;

const bottomSheetTemplate = `
  <md-bottom-sheet class="share-sheet">
    share this shit
  </md-bottom-sheet>
`;

const postCardComponent = () => {
  return new Component({
    template,
    scope: {
      post: '='
    },
    controller: function($mdBottomSheet, $state) {
      this.share = (post, $event) => {
        $mdBottomSheet.show({
          template: bottomSheetTemplate,
          targetEvent: $event
        })
      };

      this.read = (url) => {
        const parts = url.split('/');
        const [date, slug] = parts;
        $state.go('post', {date, slug});
      };
    }
  });
}

export {postCardComponent};
