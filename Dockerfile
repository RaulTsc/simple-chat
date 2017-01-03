FROM node:argon

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 9000

CMD ["node", "server/index.js"]