/**
 * Created by bruce on 6/1/15.
 */
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('User', function() {
    it('should return a 200 response', function (done) {
        api.get('/users/userlist')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});

describe('UserApp', function(){

    it('should be an object with keys and values', function(done) {
        api.get('')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                expect(res.body).to.hasOwnProperty("username");
                expect(res.body.username).to.not.equal(null);
                expect(res.body).to.hasOwnProperty("email");
                expect(res.body.email).to.not.equal(null);
                expect(res.body).to.hasOwnProperty("fullname");
                expect(res.body.fullname).to.not.equal(null);
                expect(res.body).to.hasOwnProperty("age");
                expect(res.body.age).to.not.equal(null);
                expect(res.body).to.hasOwnProperty("location");
                expect(res.body.location).to.not.equal(null);
                expect(res.body).to.hasOwnProperty("gender");
                expect(res.body.gender).to.not.equal(null);
                done();
            });
    });
})

describe('Update User', function(){

    it('should be updated with a new name', function (done) {
        api.put('/users/updateuser/556dd5b867bd841c1ed735e6')
            .set('Accept', 'application/json')
            .send({
                username: "chineybru",
                email: "burususan@gmail.com",
                fullname: "Bruce HFung",
                age: "28",
                location: "St. And",
                gender: "Male"
            })
            .expect(200)
            .end(function (err, res) {

                console.log(res.body);
                //expect(res.body.username).to.equal("chineybrucey");
                //expect(res.body.email).to.equal("burususan@gmail.com");
                //expect(res.body.fullname).to.equal("Bruce HF");
                //expect(res.body.age).to.equal("28");
                //expect(res.body.location).to.equal("Kingston");
                //expect(res.body.gender).to.equal("Male");
                done();
            }
        );
    });

});