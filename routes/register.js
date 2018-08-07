let express = require('express');
let router = express.Router();
let moment = require('moment');
let connection = require('../mysqlConnection');
let bitcore = require('bitcore-lib');

router.get('/', function(req,res, next){
    res.render('register', {
        title: 'Sign up'
    });
});

router.post('/', function(req, res, next) {
    var userName = req.body.user_name;
    var email = req.body.email;
    var password = req.body.password;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var privateKey = new bitcore.PrivateKey();
    var privatekey = privateKey.toString();
    var emailExistsQuery = 'SELECT * FROM users WHERE email = "' + email + '" LIMIT 1'; 
    var registerQuery = 'INSERT INTO users (user_name, email, password, created_at, private_key) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '", ' + '"' + privatekey + '")'; 
    
    connection.query(emailExistsQuery, function(err, email) {
      var emailExists = email.length;
      if (emailExists) {
        res.render('register', {
          title: 'Sign up',
          emailExists: 'Already registered email address'
        });
      } else {
        connection.query(registerQuery, function(err, rows) {
          res.redirect('/login');
        });
      }
    });
  });

module.exports = router;