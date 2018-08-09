bitcoinWebWallet
====

## 概要

bitcoreライブラリを使ったweb aplicationです。

## 始め方

①このリポジトリをクローンしてください


②クローンしたリポジトリでnpm installを実行し、dependenciesに記載されたモジュールを全てインストールしてください

※bitcore-expressモジュール内にあるbitcore-libフォルダ(bitcoinWebWallet→node_modules→bitcore-explorers→node_modules)を削除して下さい。削除せずにアプリを起動すると以下のエラーが発生します。

【エラーメッセージ】More than one instance of bitcore-lib found. Please make sure to require bitcore-lib and check that submodules do not also include their own bitcore-lib dependency.


③このWebアプリを起動する前にMySQLにデータベースとテーブルの作成が必要です。そのために、事前にinit.sqlを実行してください

mysql -h <db host> -u <db user> -p <db name> < init.sql


④サーバーを起動する前に[mysqlConnection.js](https://github.com/adrenaline0206/bitcoinWebWallet/blob/master/mysqlConnection.js#L5)をご自身のDB設定に合わせて下さい


⑤npm startでサーバーを起動してください


⑥ブラウザでアクセスする際にはgoogle chromeでlocalhost:3000にアクセスしてください