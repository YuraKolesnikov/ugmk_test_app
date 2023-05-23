# Use an official Node.js runtime as the base image
FROM node:16.16

# Define environment variable for NPM
ENV NPM_VERSION=8.11

# Define environment variable for Yarn
ENV YARN_VERSION=1.22.10

# Install NPM and Yarn
RUN npm install -g npm@$NPM_VERSION

# Set the working directory in the container to /app
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and other configuration files to the working directory
COPY package.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the current directory contents into the container at /app
COPY . .

# Build server and client
RUN yarn build-server
RUN yarn build-client

EXPOSE 3000
EXPOSE 8000

# Run the deploy script when the container launches
CMD ["yarn", "deploy"]
