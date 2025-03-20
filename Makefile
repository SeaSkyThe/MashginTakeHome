.PHONY: start stop build setup

# Need to check if your system needs 'sudo' to run docker
DOCKER_COMPOSE = sudo docker compose

help:
	@echo "Available commands"
	@echo "  make start			- Start all containers"
	@echo "  make stop 			- Stop all containers"
	@echo "  make build			- Build all containers"
	@echo "  make setup 		- Initial project setup"

# Docker commands
start:
	$(DOCKER_COMPOSE) up
stop:
	$(DOCKER_COMPOSE) down
build:
	$(DOCKER_COMPOSE) build

setup:
	chmod +x backend/entrypoint.sh
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up
	@echo "Setup complete. Services are running"

