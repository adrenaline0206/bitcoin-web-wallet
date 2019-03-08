const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const bcrypt = require('bcrypt');

//When logged in, redirect to wallet screen if you access to login screen.
router.get('/', function(req, res) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'Sign in to your wallet'
    });
  }
});

router.post('/', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  
  const query = 'SELECT user_id,password FROM users WHERE email = ? LIMIT 1';
  connection.query(query,email, async function(err, rows) {
    if(!err){
      if(rows.length === 0){
        res.render('login', {
        title: 'Sign in',
        noUser: 'The email address and password are incorrect'
      });
      }else{
        const hash = rows[0].password;
        //Password is encrypted and saved
        const hashs = await bcrypt.compare(password, hash);
        if (hashs) {
          const userId = rows[0].user_id;
          req.session.user_id = userId;
          res.redirect('/');
        } else {
          res.render('login', {
          title: 'Sign in',
          noUser: 'The email address and password are incorrect'
          });
        }
      }
    }else{
      console.log(err);
    }
  });
});

module.exports = router;
