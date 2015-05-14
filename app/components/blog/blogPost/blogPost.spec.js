import {BlogPostController} from './blogPost.controller';
import {BlogPostComponent} from './blogPost.component';
import template from './blogPost.template.html';

let ddo;
let Controller;

describe('BlogPost Component', () =>{
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
