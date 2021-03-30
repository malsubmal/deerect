FROM node:latest
WORKDIR /usr/app/
COPY . .
RUN npm i
COPY . .
EXPOSE 5003
CMD ["node","server.js","http://localhost:5443","MY_SECRET"]