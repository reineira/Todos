FROM node:latest AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/server

COPY package*.json .

RUN npm install

COPY . .


CMD ["npm", "start"]
