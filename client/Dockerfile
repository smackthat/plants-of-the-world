FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install
RUN npm install -g sass
CMD ["npm", "run", "build"]