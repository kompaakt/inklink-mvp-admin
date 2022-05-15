FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf
RUN ["unlink /etc/nginx/sites-enabled/default", "cat /etc/nginx/nginx.conf"]

