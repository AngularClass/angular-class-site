var request = require('supertest');

describe('Components', () =>{
  let app;

  before(() =>{
    return System.import('server')
      .then(function(module){
        app = module.app;
        return;
     });
  });


  describe('Sitemap', () =>{
    before(() =>{
      return System.import('config/seed')
        .then( seed =>{
          return seed.default();
        });
    });

    it('should make a dynamic sitemap', done =>{
      request(app)
        .get('/sitemap.xml')
        .expect('Content-Type', /xml/)
        .expect(200)
        .end((err, res)=>{
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
