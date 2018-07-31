//MySQLでデータベースの管理
var mysql = require('mysql');

//コネクション情報
var dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bulletin_board'
};

//MySQLにコネクションを接続
var connection = mysql.createConnection(dbConfig);

module.exports = connection