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

    it('should be updating the user info', function (done) {
        api.put('/users/updateuser/556dd5b867bd841c1ed735e6')
            .set('Accept', 'application/json')
            .send({
                username: "chineybru",
                email: "burususan@gmail.co",
                fullname: "Bruce HFung",
                age: "28",
                location: "St. Andrew",
                gender: "Male"
            })
            .expect(200)
            .end(function (err, res) {
                expect(err).to.equal(null);
                expect(typeof res.body).to.equal('object');
                console.log(res.body);

                expect(res.body.username).to.equal("chineybru");
                expect(res.body.email).to.equal("burususan@gmail.co");
                expect(res.body.fullname).to.equal("Bruce HFung");
                expect(res.body.age).to.equal("28");
                expect(res.body.location).to.equal("St. Andrew");
                expect(res.body.gender).to.equal("Male");
                done();
            }
        );
    });

});

/*
 *  This section deals with testing for authorization of the application page
 */
//describe('Unauthorized User', function(){
//
//    it('should not be able to access other users locations', function(done){
//        api.get('/users/1')
//            .set('Accept', 'application/json')
//            .send({
//                userId: 1
//            })
//            .expect(401)
//            .end(function(err, res){
//                if(err) return done(err);
//                expect(res.error.text).to.equal("Unauthorized");
//                done();
//
//
//            });
//    });
//});

//describe('test the order of Mocha hooks', function(){
//    before( function(){ console.log('before'); });
//    after( function(){ console.log('after'); });
//    beforeEach( function(){ console.log('beforeEach'); });
//    afterEach( function(){ console.log('afterEach'); });
//    it('test 1', function(){ console.log('1'); });
//    it('test 2', function(){ console.log('2'); });
//
//});

describe('Should write a user before any other test is checked', function(){

    before(function(done) {

        setTimeout(function() {done()}, 1000);
        api.post('/users/adduser')
            .set('Accept','application/json')
            .send({username: "flippa", email: "flipper@hotmail.com", fullname: "Margeoux Deville", age: "23", location: "Lens", gender: "Female" })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                expect(err).to.equal(null);
                expect(typeof res.body).to.equal('object');
                console.log(res.body);
            });
    });

    // enables me to take out the most recent object within the array
    it('should access the users information', function(done) {

        api.get('/users/userlist')
            .set('Accept', 'application/json')
            .send({
                username: "flippa"
            })
            .expect(200)
            .end(function(err, res) {

                expect(err).to.equal(null);
                expect(typeof res.body).to.equal('object');
                console.log(res.body.pop());

                //expect(res.body[10].username).to.equal("flippa");
                //expect(res.body[10].location).to.equal("Lens");
                done();
            });
    });

});

//describe("a test", function(){
//    var foo = false;
//
//    beforeEach(function(){
//
//        // simulate async call w/ setTimeout
//        setTimeout(function(){
//            foo = true;
//            done();
//        }, 50);
//
//    });
//
//    it("should pass", function(){
//        expect(foo).equals(true);
//    });
//
//});