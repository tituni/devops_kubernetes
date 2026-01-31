FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN chmod u+x ./cronjob.sh

CMD ["./cronjob.sh"]