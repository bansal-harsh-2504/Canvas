docker build --build-arg DB_URL=postgres://postgres:ilovemyindia@localhost:5432 -t canvas-backend -f ./docker/Dockerfile.backend .

docker build --build-arg DB_URL=postgres://postgres:ilovemyindia@localhost:5432 -t canvas-frontend -f ./docker/Dockerfile.frontend .

docker build --build-arg DB_URL=postgres://postgres:ilovemyindia@localhost:5432 -t canvas-ws -f ./docker/Dockerfile.ws .


or 

docker compose up --build