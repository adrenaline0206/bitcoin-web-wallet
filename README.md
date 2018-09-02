bitcoinWebWallet
====

## Overview

It is a web application using bitcore-lib.

## Setting

①Please clone of bitcoinWebWallet repository.


②Run npm install on the cloned repository and install all the modeles listed in dependencies.

※Delete the bitcore-lib folder in the bitcore-explorers module.(bitcoinWebWallet→node_modules→bitcore-explorers→node_modules)を
If you do not delete, the following error will occur when launching the application.

【Error message】More than one instance of bitcore-lib found. Please make sure to require bitcore-lib and check that submodules do not also include their own bitcore-lib dependency.


③It is neccessary to create a database and tables in MySQL before launching this web application. For that, please execute "init.sql" in advance.

mysql -h <db host> -u <db user> -p <db name> < init.sql


④Before starting the server, Please match [mysqlConnection.js](https://github.com/adrenaline0206/bitcoinWebWallet/blob/master/mysqlConnection.js#L5) with your own DB setting.


⑤Please start the server at npm start.


⑥Please access localhost: 3000 with google chrome when accessing with the browser.

## Environment
・node version V10.7.0

・npm version 6.1.0

・MySQL version 14.14 Distrib 5.7.23