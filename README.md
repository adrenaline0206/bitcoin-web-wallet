bitcoinWebWallet
====

## 概要

bitcoreライブラリを使ったweb Aplicationです。

## 始め方

・このリポジトリをクローンして下さい

・npm installでdependenciesに記載されたモジュールを全てインストールして下さい

※bitcore-expressモジュール内にあるbitcore-libフォルダを削除して下さい。削除せずにアプリを起動すると以下のエラーが発生します。
More than one instance of bitcore-lib found. Please make sure to require bitcore-lib and check that submodules do not also include their own bitcore-lib dependency.

・このWebアプリを起動する前にMySQLにデータベースとテーブルの作成が必要です。そのために、事前にinit.sqlを実行してください。

mysql -h <host> -u <user> -p < init.sql

・