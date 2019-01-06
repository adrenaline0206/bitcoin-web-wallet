let connection = require('./mysqlConnection');

module.exports = function(req, res, next) {
  let userId = req.session.user_id;
  //Confirm that user_id set for session
  if (userId) {
    let query = 'SELECT user_id, user_name FROM users WHERE user_id = ?';
    connection.query(query,userId, function(err, rows) {
      if(!err){
        res.locals.user = rows.length? rows[0]: false;
      }else{
        console.log(err);
      }
    });
  }
  next();
};