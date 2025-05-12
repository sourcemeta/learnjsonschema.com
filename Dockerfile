FROM debian:bookworm-slim
RUN apt-get update \
  && apt-get install -y make hugo nodejs npm \
  && rm -rf /var/lib/apt/lists/*

COPY assets /site/assets
COPY config /site/config
COPY content /site/content
COPY layouts /site/layouts
COPY static /site/static
COPY vendor /site/vendor
COPY Makefile /site/Makefile
COPY package-lock.json /site/package-lock.json
COPY package.json /site/package.json

RUN make -C /site node_modules
CMD ["make", "-C", "/site", "html"]
