ARG PORT
FROM node:17
WORKDIR /app
ADD package*.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

ADD . ./
EXPOSE $PORT
CMD ["node", "index.js"]