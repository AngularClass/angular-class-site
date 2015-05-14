import {CreatePostController} from './createPost.controller';
import {CreatePostComponent} from './createPost.component';
import template from './createPost.template.html';

let ddo;
let Controller;

describe('Create Post Component', () =>{
  beforeEach(() => {
    ddo = CreatePostComponent();
  });

  describe('Controller', () => {
    it('should be a class', () => {
      expect(CreatePostController).to.be.a('function');
    });

    it('should inject it\'s dependencies', () =>{
      expect(CreatePostController.$inject).to.be.a('array');
    });
  });

  describe('Component', ()=>{
    it('should return a DDO', ()=>{
      expect(ddo).to.be.an('object');

      expect(ddo).to.have.property('controller', CreatePostController);
      expect(ddo).to.have.property('bindToController', true);
      expect(ddo).to.have.property('restrict', 'E');
      expect(ddo).to.have.property('controllerAs', 'vm');
      expect(ddo).to.have.property('template', template);
      expect(ddo).to.have.property('scope');

      expect(ddo.scope).to.be.an('object');
    });

    it('should inject it\'s dependencies', () =>{
      expect(CreatePostComponent.$inject).to.be.a('array');
    });
  });
});

