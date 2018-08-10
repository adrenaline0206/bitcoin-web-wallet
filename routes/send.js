let express = require('express');
let router = express.Router();
let connection = require('../mysqlConnection');
let bitcore = require('bitcore-lib');
let explorers = require('bitcore-explorers');
let Transaction = bitcore.Transaction;
let insight = new explorers.Insight();

router.get('/', function(req, res, next) {
    res.redirect('/');
  });

router.post('/', function(req, res, next) {
    if (req.session.user_id ) {
        let userId = req.session.user_id;
        let query = 'SELECT private_key FROM users WHERE user_id = ?';
        connection.query(query,userId, function(err, rows) {
            let privateKey = rows[0].private_key;
            let privatekey = new bitcore.PrivateKey(privateKey);
            let address = privatekey.toAddress();
            let feeAddress = address.toString();
            let sendAddress = req.body.send_address;
            let sendAmount = Math.floor(parseFloat(req.body.send_amount)*100000000);
            let fee = parseFloat(req.body.fee);

            insight.getUnspentUtxos(feeAddress, function(err, utxos){
                if(err){
                    console.log('Bitcoin network connection error');
                }else{
                    let transaction = new Transaction()
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