FROM docker.io/node:12-alpine

WORKDIR /user-app

COPY package*.json ./

RUN npm ci --only=production

COPY --chown=1001:0 . .
# RUN chmod -R g=u .

ARG ENV=production
ENV NODE_ENV $ENV

USER 1001
CMD npm run $NODE_ENV