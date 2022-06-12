FROM node:16.10-alpine As development

WORKDIR /api

COPY package.json yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn run build

FROM node:16.10-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /api

COPY package.json yarn.lock ./

RUN yarn install --production=true

COPY . .

COPY --from=development /api/dist ./dist

CMD ["node", "dist/main"]