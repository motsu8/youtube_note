<h3 align="center">
    <a href="https://chrome.google.com/webstore/detail/repost/ncecccibmoomlikfocmpmidbhiioonlm">
        <img src="/public/logo.png" height="200">
    </a>
</h3>

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/motsu8/question_post_system)
![image](https://img.shields.io/badge/TypeScript-E2E8F0?logo=typescript)
![image](https://img.shields.io/badge/React-E2E8F0?logo=react)
![image](https://img.shields.io/badge/Next.js-E2E8F0?logo=nextdotjs&logoColor=000000)
![image](https://img.shields.io/badge/Supabase-E2E8F0?logo=supabase)
![image](https://img.shields.io/badge/Markdown-E2E8F0?logo=markdown&logoColor=000000)
![image](https://img.shields.io/badge/FontAwesome-E2E8F0?logo=fontawesome)
![image](https://img.shields.io/badge/tailwindcss-E2E8F0?logo=tailwindcss)
![image](https://img.shields.io/badge/ESLint-E2E8F0?logo=eslint&logoColor=9932cc)
![image](https://img.shields.io/badge/prettier-E2E8F0?logo=prettier)
![image](https://img.shields.io/badge/YouTubeDataAPI-E2E8F0?logo=youtube&logoColor=ff0000)


## 概要
YouTube動画を見ながらノートをとることができる[Webアプリ](https://youtube-note-neon.vercel.app/)アプリです。

ノートはマークダウンエディタとなっており、HTMLプレビューでスタイルを確認することができます。また、プログラミング言語別のシンタックスハイライトに対応しているため、コードブロックが読みやすくなっています。

学習したい動画はアプリ内で動画のURLを指定し、動画を保存することでノートでの参照ができるようになります。

<div align=center>
<img src="/public/demo.gif">
</div>

## 使用方法
1. ノート一覧画面にてノートを作成します。
2. プレイリスト画面にて動画URLを指定し、動画を保存します。
1. ノートエディタもしくは、動画選択でそれぞれの参照先を指定します。

### ノート一覧での利用機能
- フォルダ・ノートの検索
- フォルダ・ノートの新規作成
- チェックボックスで選択したフォルダ・ノートの削除

### ノートエディタでの利用機能
- 参照動画の関連付け
- Markdownエディタ
- HTMLプレビュー
- 言語別シンタックスハイライト

### プレイリスト一覧での利用機能
- 動画URLでのアプリ内保存
- 保存済み動画のURL検索
- カスタムプレイリストの作成
- チェックボックスで選択した動画・カスタムプレイリストの削除

### ユーザー認証機能
- Googleサインイン
- サインアウト
- 登録解除



## URL
[Webアプリ](https://youtube-note-neon.vercel.app/)

## 使用技術
|カテゴリ|技術|
|----|----|
|フロントエンド|Typescript React Next.js Tailwindcss|
|バックエンド|Next.js|
|インフラ|Vercel|
|Baas|Supabase|
|ビルド|Next.js|
|CI|husky|
|...etc|ESLint prettier FontAwesome|