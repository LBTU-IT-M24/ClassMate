FROM node:16-alpine as build-stage

WORKDIR /app

COPY ./frontend/package*.json ./
COPY ./frontend/tsconfig*.json ./
COPY ./frontend/vite.config.ts ./

RUN npm install

COPY ./frontend .

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /var/www/html

COPY ./docker/frontend/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./docker/frontend/start.sh /start.sh

RUN chmod +x /start.sh

EXPOSE 80

ENTRYPOINT ["/start.sh"]