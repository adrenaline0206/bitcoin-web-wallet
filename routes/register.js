let express = require('express');
let router = express.Router();
let moment = require('moment');
let connection = require('../mysqlConnection');
let bitcore = require('bitcore-lib');
let bcrypt = require('bcrypt');

router.get('/', function(req,res, next){
    res.render('register', {
        title: 'Sign up'
    });
});

router.post('/', function(req, res, next) {
    var userName = req.body.user_name;
    var emails = req.body.email;
    var password = req.body.password;
    var saltRounds = 10;
    var hash = bcrypt.hashSync(password, saltRounds);
  
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var privateKey = new bitcore.PrivateKey();
    var privatekey = privateKey.toString();
    var emailExistsQuery = 'SELECT * FROM users WHERE email = ? LIMIT 1'; 
    var registerQuery = 'INSERT INTO users (user_name,email, password, created_at, private_key) VALUES(?,?,?,?,?);'
    connection.query(emailExistsQuery,emails, function(err, email) {
      var emailExists = email.length;
      if (emailExists) {
        res.render('register', {
          title: 'Sign up',
          emailExists: 'Already registered email address'
        });
      } else {
        connection.query(registerQuery,[userName,emails,hash,createdAt,privatekey], function(err, rows) {
        res.redirect('/login');
        });
      }
    });
  });

module.exports = router;