FROM mhart/alpine-node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Bundle app source
COPY . .

ENTRYPOINT [ "npm", "run", "start-prod" ]
