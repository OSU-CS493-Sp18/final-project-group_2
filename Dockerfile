FROM node:9

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

COPY . .



ENV PORT=8001
EXPOSE ${PORT}

CMD [ "npm", "start" ]
