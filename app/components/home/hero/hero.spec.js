import {HeroController} from './hero.controller';
import {HeroComponent} from './hero.component';
import template from './hero.template.html';

let ddo;
let Controller;

describe('Hero Component', () =>{

  before(()=>{
    Controller = new HeroController();
    ddo = HeroComponent();
  });

  describe('Controller', () => {
    it('should be a class', () => {
      expect(HeroController).to.be.a('function');
    });

    it('should inject it\'s dependencies', () =>{
      expect(HeroController.$inject).to.be.a('array');
    });
  });

  describe('Component', ()=>{
    it('should return a DDO', ()=>{
      expect(ddo).to.be.an('object');

      expect(ddo).to.have.property('controller', HeroController);
      expect(ddo).to.have.property('bindToController', true);
      expect(ddo).to.have.property('restrict', 'E');
      expect(ddo).to.have.property('controllerAs', 'vm');
      expect(ddo).to.have.property('template', template);
      expect(ddo).to.have.property('scope');

      expect(ddo.scope).to.be.an('object');
    });

    it('should inject it\'s dependencies', () =>{
      expect(HeroComponent.$inject).to.be.a('array');
    });
  });
});
