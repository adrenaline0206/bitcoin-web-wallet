FROM node:10.7.0

ADD bitcoinWallet /bitcoinWallet

WORKDIR /bitcoinWallet

RUN npm install

RUN rm -r node_modules/bitcore-explorers/node_modules

CMD npm start 