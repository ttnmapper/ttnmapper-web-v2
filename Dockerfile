# Setup yarn environment - try to only run this once

FROM node:8.15.0 as npm_environment
LABEL builder=true

WORKDIR /frontend

COPY package.json yarn.lock ./

# Install packages
RUN yarn install --pure-lockfile --cache-folder ./.yarn-cache





from npm_environment as builder
LABEL builder=true

WORKDIR /frontend

# Copy files in
COPY . ./

# Run webpack build
RUN yarn run build --pure-lockfile --cache-folder ./.yarn-cache

# Copy results
CMD cp -a /frontend/build/. /frontend/output_folder
