FROM node:latest 

WORKDIR /mydir  
COPY notesfront front
RUN cd front && npm install --silent && npm run build --silent && cd .. 
RUN cp -r front/dist build && rm -r front
COPY frontserver . 
RUN npm install
CMD ["node", "./bin/www"] 