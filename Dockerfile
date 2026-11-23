FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY app.js ./

FROM base AS test
COPY app.test.js ./
RUN npm test

FROM base AS production
EXPOSE 3000
CMD ["npm", "start"]
