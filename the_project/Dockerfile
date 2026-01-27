FROM node:alpine

WORKDIR /usr/src/app

COPY ./cronjob .

COPY ./backend/middlewareback/utils ./utils

RUN npm i

CMD ["node", "index.js"]