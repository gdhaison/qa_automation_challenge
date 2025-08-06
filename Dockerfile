FROM mcr.microsoft.com/playwright:v1.46.0-focal

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "test:bdd"]