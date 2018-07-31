var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

//もしログインしている場合はログイン画面にアクセスすると
//メイン画面にリダイレクトする
router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'Sing in to your wallet'
    });
  }
});


router.post('/', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var query = 'SELECT user_id FROM users WHERE email = "' + email + '" AND password = "' + password + '" LIMIT 1';
  connection.query(query, function(err, rows) {
    var userId = rows.length? rows[0].user_id: false;
    if (userId) {
      req.session.user_id = userId;
      res.redirect('/');
    } else {
      res.render('login', {
        title: 'Sing in',
        noUser: 'The email address and password are incorrect'
      });
    }
  });
});

module.exports = router;