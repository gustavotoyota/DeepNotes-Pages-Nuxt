FROM node:16.13.2

WORKDIR '/app'

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

ENV HOST 0.0.0.0

CMD [ "yarn", "start" ]