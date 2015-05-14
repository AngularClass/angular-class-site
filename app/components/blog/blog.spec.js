import BlogModule from './index';

let $state;
let $rootScope;

describe('Blog Component', () =>{
  beforeEach(window.module(BlogModule.name));

  beforeEach(inject((_$state_, _$rootScope_) =>{
    $state = _$state_;
    $rootScope = _$rootScope_;
  }));

  describe('Module', ()=>{
    it('should have the right module name', () =>{
      expect(BlogModule.name).to.equal('blog');
    });
  });

  describe('Routing', () =>{
    it('should have the correct routing', () =>{
      $state.go('blog');
      $rootScope.$apply();

      expect($state.current.name).to.equal('blog');
      expect($state.current.url).to.equal('/blog');
      expect($state.current.template).to.equal('<ac-blog></ac-blog>');
    });
  });
});

