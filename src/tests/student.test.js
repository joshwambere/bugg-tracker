/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import http from 'chai-http';
import app from '../app';


process.env.NODE_ENV = 'test';
chai.use(http);
const { expect } = chai;

describe('student endpoint', () => {
  describe('POST student info', () => {
      it('should post student info ', (done) => {
        const data = {
          StudentId:'21125',
          names:'Johnson Dusabe',
          gender:'Male',
          dob:'18-03-1999',
        };
        chai
          .request(app)
          .post('/students/add')
          .send(data)
          .end((err, response) => {
            expect(response).to.have.status(201);
            expect(response.body).to.be.an('object');
            done();
          });
      });

      it('should not post student info ', (done) => {
        const data = {
          gender:'Male',
          dob:'18-03-1999',
        };
        chai
          .request(app)
          .post('/students/add')
          .send(data)
          .end((err, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            done();
          });
      });
    
      it('should post student info into DB', (done) => {
        const info = {
          StudentId:'21125',
          names:'Johnson Dusabe',
          gender:'Male',
          dob:'18-03-1999',
          registration:'sdksdjskd',
          createdAt:"2021-02-27 22:20:29.716+02",
          updatedAt: "2021-02-27 22:20:29.716+02"
        };
        chai
          .request(app)
          .post('/students/submit')
          .send(info)
          .end((err, response) => {
            expect(response).to.have.status(201);
            expect(response.body).to.be.an('object');
            done();
          });
      });
      
      it('should NOT post student info into DB', (done) => {
        const info = {
          StudentId:'21125',
          names:'Johnson Dusabe',
          gender:'Male',
          dob:'18-03-1999',
          createdAt:"2021-02-27 22:20:29.716+02",
          updatedAt: "2021-02-27 22:20:29.716+02"
        };
        chai
          .request(app)
          .post('/students/submit')
          .send(info)
          .end((err, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            done();
          });
      });
      it('should NOT post student info into DB', (done) => {
        const info = {
          StudentId:'21125',
          names:'Johnson Dusabe',
          gender:'Male',
          dob:'18-03-1999',
          registration:'sdksdjskd',
          createdAt:['dfdfd','dfdfd'],
          updatedAt: "2021-02-27 22:20:29.716+02"
        };
        chai
          .request(app)
          .post('/students/submit')
          .send(info)
          .end((err, response) => {
            expect(response).to.have.status(500);
            expect(response.body).to.be.an('object');
            done();
          });
      });
  });
});