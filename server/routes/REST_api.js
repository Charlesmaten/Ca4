var express = require('express');
var router = express.Router();
var dataLayer = require('../dataLayer');
//var mongoose = require('mongoose');
//var user = mongoose.model('User');



router.get('/getWiki/:title', function(req, res) {
  var title = req.params.title;

  dataLayer.getWiki(title, function(err, result) {
    if(err) res.status(500).send("Failed" + err);
    else {
      res.json(result);
    }
  });
});

router.get('/findWiki/:search', function(req, res) {

  var searchString = req.params.search;

  dataLayer.findWiki(searchString, function(err, result) {
    if (err) res.status(500).send("Fail" + err);
    else {
      res.json(result);
    }
  })
})















///* GET A User From The DataBase */
//router.get('/user', function(req, res) {
//  if(typeof global.mongo_error !== "undefined"){
//    res.status(500);
//    res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
//    return;
//  }
//  user.find({}, function (err, users) {
//    if (err) {
//      res.status(err.status || 400);
//      res.end(JSON.stringify({error: err.toString()}));
//      return;
//    }
//    res.header("Content-type","application/json");
//    res.end(JSON.stringify(users));
//  });
//});

module.exports = router;
