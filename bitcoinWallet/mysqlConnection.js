var mysql = require('mysql');

var dbConfig = {
  host: 'db',
  user: 'root',
  password: 'mysql',
  database: 'bulletin_board'
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection