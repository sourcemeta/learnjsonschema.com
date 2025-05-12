FROM debian:bookworm-slim
RUN apt-get update \
  && apt-get install -y make nodejs npm curl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

ARG HUGO_VERSION=0.147.2
ARG HUGO_RELEASE=https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}
RUN ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then HUGO_ARCH="64bit"; \
    elif [ "$ARCH" = "arm64" ]; then HUGO_ARCH="ARM64"; \
    else echo "Unsupported architecture: $ARCH"; exit 1; fi && \
    curl -L ${HUGO_RELEASE}/hugo_extended_${HUGO_VERSION}_Linux-${HUGO_ARCH}.tar.gz \
    | tar -xz -C /usr/local/bin hugo

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
