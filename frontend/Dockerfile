FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 本番環境用イメージ
FROM node:20-alpine

WORKDIR /app

# 本番環境のみの依存関係をインストール
COPY package*.json ./
RUN npm install --production

# ビルド済みのアプリケーションをコピー
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# アプリケーションを実行
EXPOSE 3001
CMD ["npm", "start"] 