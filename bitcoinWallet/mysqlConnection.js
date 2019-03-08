const mysql = require('mysql');

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'mysql',
  database: 'bulletin_board'
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection
