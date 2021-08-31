FROM node:15.4 as build
WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install
RUN npm run prod

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/GEC-VIRTUAL-CHURCH/ /usr/share/nginx/html

