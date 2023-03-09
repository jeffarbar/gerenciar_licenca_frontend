FROM mhart/alpine-node:12

RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 80
CMD [ "http-server", "dist" ]
