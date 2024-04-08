FROM node:latest

RUN apt-get update  
RUN apt-get clean 

WORKDIR /app

COPY package.json .
COPY . .

RUN npm install --production 

RUN npm run build

CMD ["npm", "run"]