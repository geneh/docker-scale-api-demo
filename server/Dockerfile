# Docker version 1.5.X
#
# To build: docker build --force-rm=true -t ghazan/server:0.0.1 .
# To run:   docker run -d -p 80:3000  ghazan/server:0.0.1
# To tag:   docker <container_id> -t ghazan/server:latest
#
# Poke at the environment:
#   docker run -t -i -p 80:3000  ghazan/server:0.0.1 /bin/bash

FROM    ubuntu:15.04
MAINTAINER ghazan

# Install dependencies
RUN apt-get update && apt-get dist-upgrade -y && apt-get install -y curl python-pip

# Install NVM and iojs
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.25.1/install.sh | bash && . ~/.bashrc  && nvm install 2.0.2 && nvm alias default 2.0.2

# Clean up unnecessary packages.  The goal is to reduce size.
RUN apt-get clean && apt-get autoclean && apt-get -y autoremove && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install supervisor and aggregate stdout to docker log
RUN easy_install supervisor==3.1.3; mkdir -p /var/log/supervisord;pip install supervisor-stdout

# Add the project
WORKDIR /root
RUN mkdir -p server client/dist
ADD . server
ADD dist client/dist

# Expose port needed for Node.js or iojs
EXPOSE 3000

#Add in supervisor configs.
ADD supervisord.conf /usr/local/etc/supervisord.conf
CMD ["/usr/local/bin/supervisord", "-c", "/usr/local/etc/supervisord.conf"]
