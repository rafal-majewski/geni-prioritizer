ARG ALPINE_VERSION
ARG NODE_JS_VERSION
FROM node:${NODE_JS_VERSION}-alpine${ALPINE_VERSION} AS developer
WORKDIR /home/developer/geni-prioritizer
USER root
RUN apk add --no-cache git
RUN apk add --no-cache openssh
RUN deluser node
RUN adduser -D developer
USER developer
