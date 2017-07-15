process.env.NODE_ENV = 'test';
require('dotenv').config()
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server/server');
console.log(server);
chai.use(chaiHttp);

describe('API Routes', () => {
  describe('Voter Routes', () => {
    it('should fail to return voters due to mongo', (done) => {
      chai.request(server)
      .get('/api/v1/voters')
      .end((err, response) => {
        // NOTE: my sad path is a 404. The 500 error code is from mongo
          response.should.have.status(500)
          // response.should.be.json
          // response.body.should.have.length(4)
          done()
        })
    })

    it('should fail to get a voter', (done) => {
      chai.request(server)
      .get('/api/v1/voters/ROTHENBERG')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to post a new voter without authentication', (done) => {
      chai.request(server)
      .post('/api/v1/voters')
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        response.should.have.status(403)
        done()
      })
    })

    it('should fail to post a new voter with authentication', (done) => {
      chai.request(server)
      .post('/api/v1/voters')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInBhc3N3b3JkIjoibGl0IiwiaWF0IjoxNTAwMDEyMjgxLCJleHAiOjE1MDAxODUwODF9.FbCXKEd2L6O-B7XukeXoIWJXryvSbQaQLYSGrEYPRTs')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to patch a new voter without id parameter', (done) => {
      chai.request(server)
      .patch('/api/v1/voters')
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })

    it('should fail to patch a new voter without authentication', (done) => {
      chai.request(server)
      .patch('/api/v1/voters/5962d67581ac7f38a3b48c39')
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        response.should.have.status(403)
        done()
      })
    })

    it('should fail to patch a new voter with authentication', (done) => {
      chai.request(server)
      .patch('/api/v1/voters/5962d67581ac7f38a3b48c39')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInBhc3N3b3JkIjoibGl0IiwiaWF0IjoxNTAwMDEyMjgxLCJleHAiOjE1MDAxODUwODF9.FbCXKEd2L6O-B7XukeXoIWJXryvSbQaQLYSGrEYPRTs')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to delete a new voter without id parameter', (done) => {
      chai.request(server)
      .delete('/api/v1/voters/')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })

    it('should fail to delete a new voter without authentication', (done) => {
      chai.request(server)
      .delete('/api/v1/voters/5962d67581ac7f38a3b48c39')
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        response.should.have.status(403)
        done()
      })
    })

    it('should fail to delete a new voter with authentication', (done) => {
      chai.request(server)
      .delete('/api/v1/voters/5962d67581ac7f38a3b48c39')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInBhc3N3b3JkIjoibGl0IiwiaWF0IjoxNTAwMDEyMjgxLCJleHAiOjE1MDAxODUwODF9.FbCXKEd2L6O-B7XukeXoIWJXryvSbQaQLYSGrEYPRTs')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })
  })

  describe('District Routes', () => {
    it('should fail to get a district', (done) => {
      chai.request(server)
      .get('/api/v1/district')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to get district by gender', (done) => {
      chai.request(server)
      .get('/api/v1/district/1/Male/')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to get voters by district', (done) => {
      chai.request(server)
      .get('/api/v1/district/1/voters/')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to patch a district without id params', (done) => {
      chai.request(server)
      .patch('/api/v1/district/')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })

    it('should fail to patch a district without authentication', (done) => {
      chai.request(server)
      .patch('/api/v1/district/1')
      .end((err, response) => {
        response.should.have.status(403)
        done()
      })
    })

    it('should fail to patch a district with authentication', (done) => {
      chai.request(server)
      .patch('/api/v1/district/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInBhc3N3b3JkIjoibGl0IiwiaWF0IjoxNTAwMDEyMjgxLCJleHAiOjE1MDAxODUwODF9.FbCXKEd2L6O-B7XukeXoIWJXryvSbQaQLYSGrEYPRTs')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to post a district without authentication', (done) => {
      chai.request(server)
      .post('/api/v1/district')
      .end((err, response) => {
        response.should.have.status(403)
        done()
      })
    })

    it('should fail to post a district with authentication', (done) => {
      chai.request(server)
      .post('/api/v1/district')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInBhc3N3b3JkIjoibGl0IiwiaWF0IjoxNTAwMDEyMjgxLCJleHAiOjE1MDAxODUwODF9.FbCXKEd2L6O-B7XukeXoIWJXryvSbQaQLYSGrEYPRTs')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to get a district by party', (done) => {
      chai.request(server)
      .get('/api/v1/district/1/party/party?party=REP')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to delete a district without id params', (done) => {
      chai.request(server)
      .delete('/api/v1/district/')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })

    it('should fail to delete a district with bad id params', (done) => {
      chai.request(server)
      .delete('/api/v1/district/a')
      .end((err, response) => {
        response.should.have.status(403)
        done()
      })
    })

    it('should fail to delete a district without authentication', (done) => {
      chai.request(server)
      .delete('/api/v1/district/1')
      .end((err, response) => {
        response.should.have.status(403)
        done()
      })
    })

    it('should fail to delete a district with authentication', (done) => {
      chai.request(server)
      .delete('/api/v1/district/1')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldiIsInBhc3N3b3JkIjoibGl0IiwiaWF0IjoxNTAwMDEyMjgxLCJleHAiOjE1MDAxODUwODF9.FbCXKEd2L6O-B7XukeXoIWJXryvSbQaQLYSGrEYPRTs')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should fail to get a specific district', (done) => {
      chai.request(server)
      .get('/api/v1/district/1')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })
  })

  describe('Authentication Route', () => {
    it('should get a error if the no request body is sent', (done) => {
      chai.request(server)
      .post('/api/v1/authenticate')
      .end((err, response) => {
        response.should.have.status(403)
        done()
      })
    })

    it('should get a token', (done) => {
      chai.request(server)
      .post('/api/v1/authenticate')
      .set('Content-Type', 'application/json')
      .send({username: process.env.USERNAME, password: process.env.PASSWORD})
      .end((err, response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.success.should.be.true
        done()
      })
    })
  })
});
