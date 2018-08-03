var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var bitcore = require('bitcore-lib'); 


router.get('/', function(req, res, next) {
  if (req.session.user_id ) {
    var userId = req.session.user_id;
    var query = 'SELECT private_key FROM users WHERE user_id = ' + userId;
    var network = 'testnet';

    connection.query(query, function(err, rows) {
      var privatekey = rows[0].private_key;
      var privateKey = new bitcore.PrivateKey(privatekey, network);
      var address = privateKey.toAddress();
      var rows = address.toString();
      res.render('index', {
        title: 'Web Wallet',
        title2: rows
      });
    });
  }else{
    res.redirect('/login');
  }
});

module.exports = router;