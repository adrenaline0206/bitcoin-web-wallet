var connection = require('./mysqlConnection');


module.exports = function(req, res, next) {
  var userId = req.session.user_id;
  //セッションにuser_idがセットされているか確認
  if (userId) {
    var query = 'SELECT user_id, user_name FROM users WHERE user_id = ' + userId;
    connection.query(query, function(err, rows) {
      if (!err) {
        res.locals.user = rows.length? rows[0]: false;
      }
    });
  }
  next();
};