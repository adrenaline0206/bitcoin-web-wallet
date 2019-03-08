const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const bitcore = require('bitcore-lib'); 
const explorers = require('bitcore-explorers');
const bigdecimal = require('bignumber.js');
const crypto = require('crypto');
const network = "testnet";

//Wallet main page processing
router.get('/', function(req, res) {
  if (req.session.user_id ) {
    const userId = req.session.user_id;
    const query = 'SELECT * FROM users WHERE user_id = ?';
   
    //Display of address and total balance
    connection.query(query,userId, function(err, rows) {
      if (!err) {
        const algorirhm = 'aes-256-cbc';
        const salt = rows[0].user_name;
        const password = rows[0].password;
        const iterations = 1000;

        //Decrypt private key with crypto and save it in the database
        let privateKey = rows[0].private_key;
        const decipher = crypto.createDecipher(algorirhm, crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256'));
        const result = decipher.update(privateKey, 'base64', 'utf8');
        privateKey = result + decipher.final('utf8');
        const privatekey = new bitcore.PrivateKey(privateKey);
        const address = privatekey.toAddress(network);
        const addressStr = address.toString();
        const insight = new explorers.Insight(network);
        let total = 0;
  
        insight.getUnspentUtxos(address, function(err, utxos){
          if (!err) {
            let balance = utxos.map(function(v){
              return{
                //convert satoshi to BTC.
                btc: (v.satoshis * 1e-8),
                txid: v.txId,
              }
            });
            for(let i=0;i < balance.length;i++){
              //Use bigdecimal modle for error correction
              total = new bigdecimal(parseFloat(balance[i].btc)).plus(total);
            } 
            res.render('index', {
              title: 'Web Wallet',
              title2: addressStr,
              title3: total,
            });
          }else{
          console.log(err)
          } 
        });
      }else{
      console.log(err);
      }
    });
  }else{
    res.redirect('/login');
  }
});

module.exports = router;
