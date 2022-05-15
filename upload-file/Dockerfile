
FROM node:slim
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./ .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "pm2" ]