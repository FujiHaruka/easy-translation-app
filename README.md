# easy-translation-app

シンプルな翻訳支援 Web アプリケーション。現在は「英語→日本語」のみ対応。

+ ユーザー認証付き
+ Google 翻訳によるサジェスチョン機能
+ 各英単語の辞書機能（英和辞書サイトへのリンク）

## Requirements

+ Node.js >= 7
+ Mongo DB
+ Redis >= 3.0

## ローカルで使ってみる

Mongo DB と Redis は起動しておきます。

### STEP 1 ダウンロードとインストール

```sh
$ git clone https://github.com/FujiHaruka/easy-translation-app
$ cd easy-translation-app
$ npm install
```

### STEP 2 環境変数の設定

`/env/index.js` を編集して、 Mongo DB と Redis のホスト、ポートを設定します。また、 Google 翻訳の API KEY も必要です。環境変数 `GOOGLE_TRANSLATE_API_KEY` に API KEY を設定してください。

### STEP 3 ユーザー登録

コマンドラインからユーザーを登録します。

```sh
# -u {user name} -p {password}
$ ./bin/register_user.js -u demo -p demo
```

### StEP 4 起動

アプリを起動します。

```sh
$ npm start
```

`http://localhost:3000` にブラウザからアクセスすると、ログイン画面が表示されます。先ほど登録したユーザー名とパスワードを入力してログインすれば使えます。
