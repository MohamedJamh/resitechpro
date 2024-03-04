FROM node:12.14.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@12.1.3

COPY . .
RUN npm run build

CMD ["ng", "serve","--host","0.0.0.0"]