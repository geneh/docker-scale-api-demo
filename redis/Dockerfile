# Docker version 1.5.X
#
# To build: docker build --force-rm=true -t ghazan/redis:0.0.1 .
# To run:   docker run --name redis -d -p 6379:6379  ghazan/redis:0.0.1
# To tag:   docker <container_id> -t ghazan/redis:latest

FROM        ubuntu:15.04
RUN         apt-get update && apt-get dist-upgrade -y && apt-get install -y redis-server
EXPOSE      6379
ENTRYPOINT  ["/usr/bin/redis-server"]
