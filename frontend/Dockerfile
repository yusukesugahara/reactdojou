FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# 開発モードで実行
CMD ["npm", "run", "dev"] 