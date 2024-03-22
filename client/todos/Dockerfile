FROM node:latest 


WORKDIR /usr/src/client

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh" , "-c" ,"npm run start:production"]
