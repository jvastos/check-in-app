FROM node:18-slim
WORKDIR /app
COPY . ./
RUN npm ci
RUN npm run build

CMD ["node", "dist/src/index.js"]