
FROM node:slim
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./ .
ENV MINIO_USER=OocahTohnuGee4AhBo7O
ENV MINIO_PASSWORD=OocahTohnuGee4AhBo7O
ENV MINIO_PORT=8484
ENV HOST=65.108.254.138

RUN npm install
EXPOSE 3000
CMD [ "node", "index.mjs" ]