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

//Create a new account
router.post('/', async function(req, res) {
    let userName = req.body.user_name;
    let emails = req.body.email;
    let password = req.body.password;
    let saltRounds = 10;
    let hash = await bcrypt.hash(password, saltRounds);
  
    let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    let privateKey = new bitcore.PrivateKey();
    let privatekey = privateKey.toString();
    let emailExistsQuery = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    let registerQuery = 'INSERT INTO users (user_name,email, password, created_at, private_key) VALUES(?,?,?,?,?);'
    connection.query(emailExistsQuery,emails, function(err, email) {
      if (!err) {
        let emailExists = email.length;
        if (emailExists) {
          res.render('register', {
          title: 'Sign up',
          emailExists: 'Already registered email address'
          });
        }else{
          connection.query(registerQuery,[userName,emails,hash,createdAt,privatekey], function(err, rows) {
            if (!err) {
              res.redirect('/login');
            }else{
              console.log(err);
            }
          });
        }
      }else{
        console.log(err);
      }  
    });
});

module.exports = router;