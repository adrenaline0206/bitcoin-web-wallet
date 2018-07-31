var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

//
router.get('/', function(req, res, next) {
  var query = '';
  connection.query(query, function(err, rows) {
    res.render('index', {
      title: 'Web Wallet'
    });
  });
});

module.exports = router;