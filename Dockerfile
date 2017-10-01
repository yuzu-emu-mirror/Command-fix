FROM mhart/alpine-node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

RUN addgroup -S app -g 50000 && \
    adduser -S -g app -u 50000 app
USER app

ENTRYPOINT [ "node", "server.js" ]
