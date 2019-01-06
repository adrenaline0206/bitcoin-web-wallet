let express = require('express');
let router = express.Router();
let connection = require('../mysqlConnection');
let bcrypt = require('bcrypt');

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
  let email = req.body.email;
  let password = req.body.password;
  
  let query = 'SELECT user_id,password FROM users WHERE email = ? LIMIT 1';
  connection.query(query,email, async function(err, rows) {
    if(!err){
      if(rows.length === 0){
        res.render('login', {
        title: 'Sign in',
        noUser: 'The email address and password are incorrect'
      });
      }else{
        let hash = rows[0].password;
        //Password is encrypted and saved
        let hashs = await bcrypt.compare(password, hash);
        if (hashs) {
          let userId = rows[0].user_id;
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