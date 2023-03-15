# Build the client
FROM node:18 as build
WORKDIR /client

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run build

# nginx serves the static files
FROM nginx AS release
# In a multi-stage build, each stage is essentially a separate Docker container with its own filesystem. Hence using from and absolute path
COPY --from=build /client/build /usr/share/nginx/html
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]