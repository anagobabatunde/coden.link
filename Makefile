.PHONY: clean install build

all: clean install build

clean:
	@echo "Cleaning up..."
	docker-compose down --remove-orphans
	docker system prune -f
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
	find . -name '.next' -type d -prune -exec rm -rf '{}' +
	find . -name 'dist' -type d -prune -exec rm -rf '{}' +

install:
	@echo "Installing dependencies..."
	find . -name 'package.json' -not -path "*node_modules*" -prune -execdir yarn install \;

build:
	@echo "Starting Docker services..."
	docker-compose up --build
