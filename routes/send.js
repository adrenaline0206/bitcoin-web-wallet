var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var bitcore = require('bitcore-lib');
var explorers = require('bitcore-explorers');
var Transaction = bitcore.Transaction;
var insight = new explorers.Insight();

router.get('/', function(req, res, next) {
    res.redirect('/');
  });

router.post('/', function(req, res, next) {
    if (req.session.user_id ) {
        var userId = req.session.user_id;
        var query = 'SELECT private_key FROM users WHERE user_id = ' + userId;
        connection.query(query, function(err, rows) {
            var privateKey = rows[0].private_key;
            var privatekey = new bitcore.PrivateKey(privateKey);
            var address = privatekey.toAddress();
            var feeAddress = address.toString();
            var sendAddress = req.body.send_address;
            var sendAmount = Math.floor(parseFloat(req.body.send_amount)*100000000);
            var fee = parseFloat(req.body.fee);


            
            
            insight.getUnspentUtxos(feeAddress, function(err, utxos){
                if(err){
                    console.log('Bitcoin network connection error');
                }else{
                    //console.log(JSON.stringify(utxos));
                    var transaction = new Transaction()
                    .fee(fee)
                    .from(utxos)
                    .to(sendAddress,sendAmount)
                    .change(feeAddress)
                    .sign(privatekey)
                    ;
                    insight.broadcast(transaction, function(err, returnedTxId) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(returnedTxId);
                        }
                    });
                }
            });    
        })
    }else{
        res.redirect('/login');   
    }
    res.redirect('/');     
});

module.exports = router;