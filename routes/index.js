var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var bitcore = require('bitcore-lib'); 
var explorers = require('bitcore-explorers');

router.get('/', function(req, res, next) {
  if (req.session.user_id ) {
    var userId = req.session.user_id;
    var query = 'SELECT private_key FROM users WHERE user_id = ?';
   
    connection.query(query,userId, function(err, rows) {
      var privatekey = rows[0].private_key;
      var privateKey = new bitcore.PrivateKey(privatekey);
      var address = privateKey.toAddress();
      var rows = address.toString();
      var insight = new explorers.Insight();
      
      //残高処理
      var total = 0;
      var txid = [];
      insight.getUnspentUtxos(address, function(err, utxos){
        if(err){
          console.log("error");
        }else{
          var balance = utxos.map(function(v){
            return{
              btc: (v.satoshis * 1e-8).toFixed(8),
              txid: v.txId,
            }
          })
          
          for(var i=0;i < balance.length;i++){
            total += parseFloat(balance[i].btc);
            txid.push(balance[i].txid);
          }
        }
        
        //画面表示
        res.render('index', {
          title: 'Web Wallet',
          title2: rows,
          title3: total,
          title4: txid,
        });
      });
    });
  }else{
    res.redirect('/login');
  }
});

module.exports = router;

 