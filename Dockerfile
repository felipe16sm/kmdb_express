FROM node:14

WORKDIR /code

COPY . /code/

RUN npm install