import {BlogPostController} from 'components/blog/blogPost/blogPost.controller';
import {BlogPostComponent} from 'components/blog/blogPost/blogPost.component';
import template from 'components/blog/blogPost/blogPost.template.html!text';
import BlogPostModule from 'components/blog/blogPost/index';
import ngMocks from 'angular-mocks';

let ddo;
let Controller;
let $httpBackend;

describe('BlogPost Component', () =>{
  beforeEach(ngMocks.module(BlogPostModule.name))

  beforeEach(ngMocks.inject((_$stateParams_, $_state_, _$q_, _$httpBackend_) =>{
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(() => {
    ddo = BlogPostComponent();
  });

  describe('Controller', () => {
    it('should be a class', () => {
      expect(BlogPostController).to.be.a('function');
    });

    it('should inject it\'s dependencies', () =>{
      expect(BlogPostController.$inject).to.be.a('array');
    });
  });

  describe('Component', ()=>{
    it('should return a DDO', ()=>{
      expect(ddo).to.be.an('object');

      expect(ddo).to.have.property('controller', BlogPostController);
      expect(ddo).to.have.property('bindToController', true);
      expect(ddo).to.have.property('restrict', 'E');
      expect(ddo).to.have.property('controllerAs', 'vm');
      expect(ddo).to.have.property('template', template);
      expect(ddo).to.have.property('scope');

      expect(ddo.scope).to.be.an('object');
    });

    it('should inject it\'s dependencies', () =>{
      expect(BlogPostComponent.$inject).to.be.a('array');
    });
  });
});
