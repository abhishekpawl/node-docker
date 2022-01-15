ARG PORT
FROM node:17
WORKDIR /app
ADD package*.json .
RUN npm install
ADD . ./
EXPOSE $PORT
CMD ["npm", "run", "dev"]