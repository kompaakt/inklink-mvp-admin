
FROM node:slim
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./ .
COPY ../.env .
ENV MINIO_USER=$MINIO_USER
ENV MINIO_PASSWORD=$MINIO_PASSWORD
ENV MINIO_PORT=$MINIO_PORT
RUN npm install
EXPOSE 3000
CMD [ "node", "index.mjs" ]