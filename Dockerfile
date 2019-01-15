FROM node:alpine
RUN npm i -g nodemon
WORKDIR "/app"
COPY ./package.json .
RUN npm install
COPY . .
CMD [ "npm","run","start" ]
