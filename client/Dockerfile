FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build



FROM nginx:1.23.4-alpine as production

ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]