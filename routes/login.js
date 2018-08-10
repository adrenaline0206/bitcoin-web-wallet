let express = require('express');
let router = express.Router();
let connection = require('../mysqlConnection');
let bcrypt = require('bcrypt');

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
  let email = req.body.email;
  let password = req.body.password;
  
  let query = 'SELECT user_id,password FROM users WHERE email = ? LIMIT 1';
  connection.query(query,email, function(err, rows) {
    if(rows.length === 0){
      res.render('login', {
        title: 'Sing in',
        noUser: 'The email address and password are incorrect'
      });
    }else{
      let hash = rows[0].password;
    let hashs = bcrypt.compareSync(password, hash);
    if (hashs) {
      let userId = rows[0].user_id;
      req.session.user_id = userId;
      res.redirect('/');
    } else {
      res.render('login', {
        title: 'Sing in',
        noUser: 'The email address and password are incorrect'
      });
    }
    }
    
  });
});

module.exports = router;