var express = require('express');
let router = express.Router();
let connection = require('../mysqlConnection');
let bitcore = require('bitcore-lib'); 
let explorers = require('bitcore-explorers');
let bigdecimal = require('bignumber.js')

//Wallet main page processing
router.get('/', function(req, res, next) {
  if (req.session.user_id ) {
    let userId = req.session.user_id;
    let query = 'SELECT private_key FROM users WHERE user_id = ?';
   
    //Display of address and total balance
    connection.query(query,userId, function(err, rows) {
      let privatekey = rows[0].private_key;
      let privateKey = new bitcore.PrivateKey(privatekey);
      //Address can be created only once.
      let address = privateKey.toAddress();
      let addressStr = address.toString();
      let insight = new explorers.Insight();
      let total = 0;
      
      insight.getUnspentUtxos(address, function(err, utxos){
        if(err){
          console.log("error");
        }else{
          let balance = utxos.map(function(v){
            return{
              //convert satoshi to BTC.
              btc: (v.satoshis * 1e-8),
              txid: v.txId,
            }
          })
          
          for(let i=0;i < balance.length;i++){
            //Use bigdecimal modle for error correction
            total = new bigdecimal(parseFloat(balance[i].btc)).plus(total);
          } 
        }
        
        res.render('index', {
          title: 'Web Wallet',
          title2: addressStr,
          title3: total,
        });
      });
    });
  }else{
    res.redirect('/login');
  }
});

module.exports = router;