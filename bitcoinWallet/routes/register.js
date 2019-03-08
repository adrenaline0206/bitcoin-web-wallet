const express = require('express');
const router = express.Router();
const moment = require('moment');
const connection = require('../mysqlConnection');
const bitcore = require('bitcore-lib');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

router.get('/', function(req,res, next){
    res.render('register', {
        title: 'Sign up'
    });
});

//Create a new account
router.post('/', async function(req, res) {
    const userName = req.body.user_name;
    const salt = userName;
    const emails = req.body.email;
    const password = req.body.password;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const network = "testnet";
    const algorism = 'aes-256-cbc';
    const iterations = 1000;
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const privateKey = new bitcore.PrivateKey(network);
    //Encrypt private key with crypto and save it in the database
    let privatekey = privateKey.toString();
    const cipher = crypto.createCipher(algorism, crypto.pbkdf2Sync(hash, salt, iterations, 32, 'sha256'));
    const result = cipher.update(privatekey, 'utf8', 'base64');
    privatekey = result + cipher.final('base64'); 

    const emailExistsQuery = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    const registerQuery = 'INSERT INTO users (user_name,email, password, created_at, private_key) VALUES(?,?,?,?,?);'

    connection.query(emailExistsQuery,emails, function(err, email) {
      if (!err) {
        let emailExists = email.length;
        if (emailExists) {
          res.render('register', {
          title: 'Sign up',
          emailExists: 'Already registered email address'
          });
        }else{
          connection.query(registerQuery,[userName,emails,hash,createdAt,privatekey], function(err) {
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
