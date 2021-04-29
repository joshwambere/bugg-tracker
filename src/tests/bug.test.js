/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import http from 'chai-http';
import { beforeEach } from 'mocha';
import app from '../app';


process.env.NODE_ENV = 'test';
let token;
chai.use(http);
const { expect } = chai;

describe('bug endpoint', () => {
  before((done) => {
    const user = {
      names:'Joh dudley',
      email: 'johndoe1@gmail.com',
      password: 'test@123',
      user_type:'admin'
    };
    chai
      .request(app)
      .post('/users/signup')
      .send(user)
      .then((res) => {
        token = res.body.token;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  describe('add bug info', () => {
      before((done) => {
        const user = {
          email: 'johndoe1@gmail.com',
          password: 'test@123'
        };
        chai
          .request(app)
          .post('/users/login')
          .send(user)
          .then((res) => {
            token = res.body.token;
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
      it('should add bug info ', (done) => {
        const data = {
          bug_title:'foreign key constraint',
          bug_desc:'when i delete value in db',
          bug_priority:'high',
          bug_status:'new' 
        };
        chai
          .request(app)
          .post('/bugs/add')
          .set('authorization', token)
          .send(data)
          .end((err, response) => {
            expect(response).to.have.status(201);
            expect(response.body).to.be.an('object');
            done();
          });
      });
      it('should add bug info ', (done) => {
        const data = {
          bug_desc:'when i delete value in db',
          bug_priority:'high',
          bug_status:'new' 
        };
        chai
          .request(app)
          .post('/bugs/add')
          .set('authorization', token)
          .send(data)
          .end((err, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            done();
          });
      });

      

      it('should not add bug info  ', (done) => {
        const data = {
          bug_title:'foreign key constraint',
          bug_desc:'when i delete value in db',
          bug_priority:'high',
          bug_status:'new' 
        };
        chai
          .request(app)
          .post('/bugs/add')
          .send(data)
          .end((err, response) => {
            expect(response).to.have.status(401);
            expect(response.body).to.be.an('object');
            done();
          });
      });
      it('should get  bug info  ', (done) => {
        chai
          .request(app)
          .get('/bugs')
          .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            done();
          });
      });
      
      describe('update bugs',(done)=>{
        it('should update bug info ', (done) => {
          const data = {
            bug_title:'foreign key constraint',
            bug_desc:'when i delete value in db',
            bug_priority:'high',
            bug_status:'new' 
          };
          chai
            .request(app)
            .put(`/bugs/update/1`)
            .set('authorization', token)
            .send(data)
            .end((err, response) => {
              expect(response).to.have.status(200);
              expect(response.body).to.be.an('object');
              done();
            });
        });
        it('should not update bug info ', (done) => {
          const data = {
            bug_priority:'high',
            bug_status:'new' 
          };
          chai
            .request(app)
            .put(`/bugs/update/1`)
            .set('authorization', token)
            .send(data)
            .end((err, response) => {
              expect(response).to.have.status(400);
              expect(response.body).to.be.an('object');
              done();
            });
        });

        it('should not update bug info ', (done) => {
          const data = {
            bug_title:'foreign key constraint',
            bug_desc:'when i delete value in db',
            bug_priority:'high',
            bug_status:'new' 
          };
          chai
            .request(app)
            .put(`/bugs/update/xzs`)
            .set('authorization', token)
            .send(data)
            .end((err, response) => {
              expect(response).to.have.status(500);
              expect(response.body).to.be.an('object');
              done();
            });
        });
      })

      describe('delete bug info', () => {
        let token2;
        before((done) => {
          const user = {
            names:'Joh dudley',
            email: 'john@gmail.com',
            password: 'test@123',
            user_type:'guest'
          };
          chai
            .request(app)
            .post('/users/signup')
            .send(user)
            .then((res) => {
              token2 = res.body.token;
              done();
            })
            .catch((err) => {
              done(err);
            });
        });

        describe('delete bugs', () => {
          let info;
          before((done) => {
            const user = {
              email: 'johndoe1@gmail.com',
              password: 'test@123'
            };
            chai
              .request(app)
              .post('/users/login')
              .send(user)
              .then((res) => {
                token2 = res.body.token;
                done();
              })
              .catch((err) => {
                done(err);
              });
          });

          beforeEach((done)=>{
            const data = {
              bug_title:'foreign key constraint',
              bug_desc:'when i delete value in db',
              bug_priority:'high',
              bug_status:'new' 
            };
            chai
              .request(app)
              .post('/bugs/add')
              .set('authorization', token)
              .send(data)
              .then((res) => {
                info = res.body;
                done();
              })
              .catch((err) => {
                done(err);
              });
          });
          
          let id=1;
          it('should  delete bug  ', (done) => {
            
            chai
              .request(app)
              .delete(`/bugs/delete/${id}`)
              .set('authorization', token)
              .end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.an('object');
                done();
              });
          });

          describe('delete bug', ()=>{
            before((done) => {
              const user = {
                email: 'john@gmail.com',
                password: 'test@123'
              };
              chai
                .request(app)
                .post('/users/login')
                .send(user)
                .then((res) => {
                  token2 = res.body.token;
                  done();
                })
                .catch((err) => {
                  done(err);
                });
            });

            before((done)=>{
              const data = {
                bug_title:'foreign key constraint',
                bug_desc:'when i delete value in db',
                bug_priority:'high',
                bug_status:'new' 
              };
              chai
                .request(app)
                .post('/bugs/add')
                .set('authorization', token)
                .send(data)
                .then((res) => {
                  info = res.body;
                  done();
                })
                .catch((err) => {
                  done(err);
                });
            });

            it('should  not delete bug  ', (done) => {
              chai
                .request(app)
                .delete(`/bugs/delete/3`)
                .set('authorization', token2)
                .end((err, response) => {
                  expect(response).to.have.status(403);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });

            it('should  not delete bug  ', (done) => {
              chai
                .request(app)
                .delete(`/bugs/delete/100`)
                .set('authorization', token2)
                .end((err, response) => {
                  expect(response).to.have.status(404);
                  expect(response.body).to.be.an('object');
                  done();
                });
            });

            describe('get single bug', () => {
              before((done)=>{
                const data = {
                  bug_title:'foreign key constraint',
                  bug_desc:'when i delete value in db',
                  bug_priority:'high',
                  bug_status:'new' 
                };
                chai
                  .request(app)
                  .post('/bugs/add')
                  .set('authorization', token)
                  .send(data)
                  .then((res) => {
                    info = res.body;
                    done();
                  })
                  .catch((err) => {
                    done(err);
                  });
              });
              

            });

          })


        });
      });
      
  });
});