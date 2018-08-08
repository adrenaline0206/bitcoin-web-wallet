var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
const bcrypt = require('bcrypt');

//もしログインしている場合はログイン画面にアクセスすると
//お財布画面にリダイレクトする
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
  
  var query = 'SELECT user_id,password FROM users WHERE email = "' + email + '" LIMIT 1';
  connection.query(query, function(err, rows) {

    var hash = rows[0].password;
    var hashs = bcrypt.compareSync(password, hash);
    if (hashs) {
      var userId = rows[0].user_id;
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