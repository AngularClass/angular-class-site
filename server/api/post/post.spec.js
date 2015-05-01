let request = require('supertest');
let _ = require('lodash');
let moment = require('moment');

let fakePost = {
  title: 'This is my post',
  raw: '<>',
  markdown: '#asdf'
};

describe('Posts', () =>{
  let router;
  let app;
  let token;
  let dbPosts = [];

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

  before(done =>{
    request(app)
      .post('/api/v1/author/login')
      .send({ email: 'scott@angularclass.com', password: 'ballin35$$' })
      .expect(200)
      .end((err, res) =>{
        if (err) {
          return done(err);
        }

        token = res.body.token;
        done();
      });
  });

  it('should GET all posts', done =>{
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
          dbPosts.push(post);
          expect(post.title).be.ok;
        });
        done();
      });
  });

  it('should GET one post', done => {
    request(app)
      .get(`/api/v1/post/${dbPosts[0]._id}`)
      .expect(200)
      .end((err, res) =>{
        if(err) {
          return done(err);
        }

        let post = res.body;
        let matchpost = dbPosts[0];
        expect(post).to.be.an('object');

        _.forEach(post, (val, k) =>{
          let check = 'equal';

          if (typeof val === 'object') {
            check = 'eql';
          }

          expect(val).to[check](matchpost[k]);
        });

        done();
      });
  });

  it('should only PUT one for authors', done =>{
    let title = 'this is the new title';

    request(app)
      .put(`/api/v1/post/${dbPosts[0]._id}`)
      .send({ title: title })
      .expect(401)
      .end((err, res) =>{
        if (err) {
          return done(err);
        }

        request(app)
          .put(`/api/v1/post/${dbPosts[0]._id}`)
          .send({ title: title })
          .set('Authorization', 'Bearer '+ token)
          .expect(201)
          .end((err, res) =>{
            if (err) {
              return done(err);
            }
            let post = res.body;
            expect(post.title).to.equal(title);

            let url = `${moment(post.publishedDate).format('DD[-]MM[-]YYYY')}/${post.slug.toLowerCase()}`
            expect(post.url).to.equal(url);
            done();
          })
      });
  });

  it('should only create post for authors', done =>{
    request(app)
      .post('/api/v1/post')
      .send(fakePost)
      .expect(401)
      .end((err, res) =>{
        if (err) {
          return done(err);
        }

        request(app)
          .post('/api/v1/post')
          .set('Authorization', 'Bearer ' + token)
          .send(fakePost)
          .expect(201)
          .end((err, res) =>{
            if (err) {
              return done(err);
            }

            let post = res.body;

            expect(post._id).to.be.ok;
            done();
          });

      });
  });

  it('should only DELETE posts for admin', done =>{
    let nonAdminToken;
    request(app)
      .post('/api/v1/author/login')
      .send({ email: 'nonadmin@angularclass.com', password: 'test123' })
      .expect(200)
      .end((err, res) =>{
        if (err){
          return done(err)
        }

        nonAdminToken = res.body.token;

        request(app)
          .delete('/api/v1/post/' + dbPosts[0]._id)
          .set('Authorization', 'Bearer ' + nonAdminToken)
          .expect(403)
          .end((err, res) =>{
            if (err) {
              return done(err);
            }

            request(app)
              .delete('/api/v1/post/' + dbPosts[0]._id)
              .set('Authorization', 'Bearer ' + token)
              .expect(200, done)
          });
      });
  });
});
