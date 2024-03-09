FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm install


CMD ["npm", "run", "dev"]
