# ベースイメージを指定
FROM node:20

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストールするためにpackage.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# 開発モードで実行
CMD ["npm", "run", "dev"]

