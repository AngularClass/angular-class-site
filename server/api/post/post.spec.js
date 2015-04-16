let request = require('supertest');
let fakePost = {
  title: 'This is my post',
  raw: '<>',
  markdown: '#asdf'
};

describe('Posts', () =>{
  let router;
  let app;

  before(() =>{
    return System.import('api/post/routes')
      .then(module =>{
        router = module.postRouter;
      })
  });

  before(() =>{
    return System.import('server')
      .then(module =>{
        app = module.app;
      });
  });

  // seed the db
  before(() =>{
    return System.import('config/seed')
      .then( seed =>{
        return seed.default();
      });
  });

  it('should get all posts', done =>{
    request(app)
      .get('/api/v1/post')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        let posts = res.body;

        posts.forEach(post =>{
          expect(post.title).be.ok;
        });
        done();
      });
  });

  it('should only create post for authors', done =>{
    request(app)
      .post('/api/v1/post')
      .send(fakePost)
      .expect(401, done);
  });
});
