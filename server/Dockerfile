FROM node:latest AS Production


WORKDIR /usr/src/server

COPY package*.json .

RUN npm install

COPY . .


CMD ["npm", "start"]
