FROM node:18 AS build
WORKDIR /server

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

# second stage: create final image
FROM node:18 AS release
WORKDIR /release

COPY --from=build /server/build build
COPY package.json .
COPY package-lock.json .

# Do not need dev dependencies
RUN npm ci --omit=dev
CMD ["node", "build/app.js"]