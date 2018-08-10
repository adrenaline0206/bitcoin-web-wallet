bitcoinWebWallet
====

## 概要

bitcore-libを使ったweb aplicationです。

## 設定

①このリポジトリをクローンしてください


②クローンしたリポジトリでnpm installを実行し、dependenciesに記載されたモジュールを全てインストールしてください

※bitcore-explorersモジュール内にあるbitcore-libフォルダ(bitcoinWebWallet→node_modules→bitcore-explorers→node_modules)を削除してください。削除しない場合、アプリを起動すると以下のエラーが発生します。

【エラーメッセージ】More than one instance of bitcore-lib found. Please make sure to require bitcore-lib and check that submodules do not also include their own bitcore-lib dependency.


③このWebアプリを起動する前にMySQLにデータベースとテーブルの作成が必要です。そのために、事前にinit.sqlを実行してください

mysql -h <db host> -u <db user> -p <db name> < init.sql


④サーバーを起動する前に[mysqlConnection.js](https://github.com/adrenaline0206/bitcoinWebWallet/blob/master/mysqlConnection.js#L5)をご自身のDB設定に合わせて下さい


⑤npm startでサーバーを起動してください


⑥ブラウザでアクセスする際にはgoogle chromeでlocalhost:3000にアクセスしてください

## 環境
・node version V10.7.0
・npm version 6.1.0
・MySQL version 14.14 Distrib 5.7.23