var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
  var db = req.db;
  db.collection('userlist').find().toArray(function (err, items) {
    res.json(items);
  });
});

/*
 * POST to add User
 */
router.post('/adduser', function(req, res){
  var db = req.db;
  db.collection('userlist').insert(req.body, function(err, result){
    res.send(
        (err === null) ? req.body : {msg: err }
    );
  });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var userToDelete = req.params.id;
  db.collection('userlist').removeById(userToDelete, function(err, result) {
    res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
  });
});


/*
 * PUT to update user
 * req is an object containing information about the HTTP request that raised the event. In response to req, you use 'res' to send back the desired HTTP response.
 */
router.put('/updateuser/:id', function(req, res) {
  var db = req.db
  var userToUpdate = req.params.id;
  var doc = { $set: req.body};

  // UpdateByID takes 3 arguments (the ID, the query that info is modified and a callback function)
  db.collection('userlist').updateById(userToUpdate, doc ,function(err, result) {
    res.send((result === 1) ? req.body : { msg:'error: ' + err });
  });
});



module.exports = router;
