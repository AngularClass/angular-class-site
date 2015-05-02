describe('Api roters'.bold.underline.blue, () =>{
  let API;

  before(() =>{
    return System.import('api/index')
      .then(function(m){
        API = m;
        return;
     });
  });

  it('should register correct sub routers', () =>{
    let checkRoute = function(regexp){
      return regexp.test('/post') || regexp.test('/author');
    };

    API.default.stack.forEach(route =>{
      expect(checkRoute(route.regexp)).to.be.ok;
    });
  });
});
