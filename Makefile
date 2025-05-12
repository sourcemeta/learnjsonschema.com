.DEFAULT_GOAL = all

HUGO ?= hugo
RMRF ?= rm -rf
NPM ?= npm
DOCKER ?= docker

node_modules: package.json package-lock.json
	$(NPM) ci

.PHONY: all
all: node_modules
	$(HUGO) server --buildDrafts --environment development

.PHONY: html
html: node_modules
	$(HUGO) --environment production --destination dist

.PHONY: clean
clean:
	$(RMRF) resources dist
	$(DOCKER) system prune --force --all --volumes || true

.PHONY: docker
docker:
	$(DOCKER) build --tag learnjsonschema .
	$(DOCKER) run --rm --volume "$(PWD)/dist:/site/dist" learnjsonschema
