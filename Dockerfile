FROM node:18

WORKDIR /loa-manager
COPY ./package.json /loa-manager
COPY ./package-lock.json /loa-manager
RUN npm install

COPY . /loa-manager

CMD npm run start