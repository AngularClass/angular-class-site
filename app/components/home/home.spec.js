import HomeModule from 'components/home/index';
import ngMocks from 'angular-mocks';

let $state;
let $rootScope;

describe('Home Component', () =>{
  beforeEach(ngMocks.module(HomeModule.name));

  beforeEach(ngMocks.inject((_$state_, _$rootScope_) =>{
    $state = _$state_;
    $rootScope = _$rootScope_;
  }));

  describe('Module', ()=>{
    it('should have the right module name', () =>{
      expect(HomeModule.name).to.equal('home');
    });
  });

  describe('Routing', () =>{
    it('should have the correct routing', () =>{
      $state.go('home');
      $rootScope.$apply();

      expect($state.current.name).to.equal('home');
      expect($state.current.url).to.equal('/');
      expect($state.current.template).to.equal('<ac-home></ac-home>');
    });
  });
});

