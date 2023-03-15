# SpectraXpress

Experience the power of Spectra IoT platform with SpectraXpress - the lightning-fast, effortless, and hassle-free way to demo and explore its capabilities.

## Installation
### Run inside production environment

`docker-compose --env-file .env up --build -d`


### Run inside development environment.

`docker compose -f docker-compose.dev.yml --env-file .env.dev up -d --build`

In both the cases, Once docker compose completes you can visit http://localhost:80 to view the application.

## Documentation


node:18-bullseye-slim -> node:18

nginx -> nginx