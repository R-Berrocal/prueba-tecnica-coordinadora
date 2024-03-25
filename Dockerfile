FROM node:19-alpine3.15 as dev
WORKDIR /app
COPY package.json ./
RUN yarn install
CMD ["yarn","dev"]

FROM node:19-alpine3.15 as dev-deps
# Instalar Git
RUN apk add --no-cache git
WORKDIR /app
COPY package.json package.json
RUN yarn install --frozen-lockfile --network-timeout 100000


FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN yarn build

FROM node:19-alpine3.15 as prod-deps
# Instalar Git
RUN apk add --no-cache git
WORKDIR /app
COPY package.json package.json
RUN yarn install --prod --frozen-lockfile --network-timeout 100000


FROM node:19-alpine3.15 as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/main.js"]