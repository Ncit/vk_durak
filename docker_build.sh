#!/bin/zsh
docker stop pocker-game-container
docker-compose build 
# docker build -t personal-website:v1 .
# docker run -d --restart=always -p 8080:80 personal-website:v1 --name="container-website"
# docker container run -d --name game-container -p 8080:80
docker-compose up 