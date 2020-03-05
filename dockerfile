FROM node:12.16

WORKDIR /usr/source/back

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "start"]