FROM node:18 As compile

WORKDIR /app

COPY . .

RUN npm install

RUN npx tsc

FROM node:18-alpine AS app

WORKDIR /app

COPY --from=compile /app/dist ./dist

COPY package.json package-lock.json ./

RUN npm install --production

COPY bin ./bin

RUN apk add --no-cache mongodb-tools

COPY .env /app/.env

COPY public ./public

COPY views ./views

CMD ["node", "bin/www"]

EXPOSE 8080



