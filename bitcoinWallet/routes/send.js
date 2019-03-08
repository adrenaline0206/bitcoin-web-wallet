const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const bitcore = require('bitcore-lib');
const explorers = require('bitcore-explorers');
const crypto = require('crypto');

const Transaction = bitcore.Transaction;
const network = "testnet";
const insight = new explorers.Insight(network);

//Can not access the send page directly
router.get('/', function(res) {
    res.redirect('/');
  });

router.post('/', function(req, res) {
    if (req.session.user_id ) {
        const userId = req.session.user_id;
        const query = 'SELECT * FROM users WHERE user_id = ?';

        connection.query(query,userId, function(err, rows) {
            if(!err){
                const algorirhm = 'aes-256-cbc'
                const salt = rows[0].user_name;
                const password = rows[0].password;
                const iterations = 1000;

                //Decrypt private key with crypto and save it in the database
                let privateKey = rows[0].private_key;
                const decipher = crypto.createCipher(algorirhm, crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256'));
                const result = decipher.update(privateKey, 'base64', 'utf8');
                privateKey = result + decipher.final('utf8');
                console.log(privateKey)
                const privatekey = new bitcore.PrivateKey(privateKey);
                console.log(privatekey)
                const address = privatekey.toAddress(network);
                console.log(address);
                const feeAddress = address.toString();
                const sendAddress = req.body.send_address;
                const sendAmount = Math.floor(parseFloat(req.body.send_amount)*100000000);
                const fee = parseFloat(req.body.fee);
                insight.getUnspentUtxos(feeAddress, function(err, utxos){
                    if(err){
                        console.log('Bitcoin network connection error');
                    }else{
                        const transaction = new Transaction()
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
            }else{
                console.log(err);
            }
        });
    }else{
        res.redirect('/login');   
    }
    res.redirect('/login');     
});

module.exports = router;
