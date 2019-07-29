FROM node as build-stage

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
ARG configuration=production
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
