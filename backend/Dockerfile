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

# TypeScriptをJavaScriptにコンパイル
RUN npm run build || echo "No build script"

# server.jsが生成されるはずのパス
CMD ["node", "dist/server.js"]