.DEFAULT_GOAL := help

WEB_DIRECTORY := ./apps/web/
API_DIRECTORY := ./apps/api/src/

.PHONY: help
help: ## Display usage instructions
	@awk 'BEGIN { \
		FS = ":.*##"; \
		printf "\nUsage:\n make TARGET\n\nTargets:\n" \
	} \
	/^[a-zA-Z_-]+:.*?##/ { \
		printf "  %-20s %s\n", $$1, $$2 \
	}' $(MAKEFILE_LIST)

.PHONY: web
web: ## Starts the web client
	@npm run --prefix ${WEB_DIRECTORY} dev

.PHONY: api
api: database-up ## Starts the API
	@dotnet watch run --project ${API_DIRECTORY} -lp https

.PHONY: database-up
database-up: ## Starts database container
	@docker compose up -d database
	@docker compose ps database

.PHONY: database-down
database-down: ## Kills the database container
	@docker compose up -d database
	@docker compose ps database
