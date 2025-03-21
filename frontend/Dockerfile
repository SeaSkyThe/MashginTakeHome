# This is suitable for development environments
# in a production environment, you should use a more robust approach
FROM node:22.14-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

EXPOSE 5173

CMD ["npm", "run", "dev"]


