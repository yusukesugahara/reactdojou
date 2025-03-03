FROM node:18 as dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# 開発モードで実行
CMD ["npm", "run", "dev"] 