WEB_DIRECTORY = ./apps/web
API_DIRECTORY = ./apps/api

web:
	cd ${WEB_DIRECTORY} && npm run dev

api:
	cd ${API_DIRECTORY}/src && dotnet watch run -lp https

.PHONY: docker/up
docker/up:
	sudo docker compose up -d
	sudo docker compose ps
