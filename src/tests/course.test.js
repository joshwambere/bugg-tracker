/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import http from 'chai-http';
import app from '../app';
import model from '../database/models';

process.env.NODE_ENV = 'test';
chai.use(http);
const { expect } = chai;

describe('course endpoint', () => {
  describe('course info', () => {
    before(async () => {
      const data={
        code:'INSY 321',
        name:'Information management',
        credit: '3',
        price: 2100.80,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await model.courses.create(data);
    });
      it('should get course  ', (done) => {
        
        chai
          .request(app)
          .get('/courses')
          .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            done();
          });
      });
  });
});