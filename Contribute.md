docker network create my-network

docker run --network my-network -e POSTGRES_PASSWORD=password -d -p 5432:5432 --name canvas-postgres postgres

DOCKER_BUILDKIT=0 docker build --network=my-network --build-arg DATABASE_URL=postgres://postgres:password@canvas-postgres:5432 -t canvas-backend -f ./.docker/Dockerfile.backend .

DOCKER_BUILDKIT=0 docker build --network=my-network --build-arg DATABASE_URL=postgres://postgres:password@canvas-postgres:5432 -t canvas-frontend -f ./.docker/Dockerfile.frontend .

DOCKER_BUILDKIT=0 docker build --network=my-network --build-arg DATABASE_URL=postgres://postgres:password@canvas-postgres:5432 -t canvas-ws -f ./.docker/Dockerfile.ws .

docker run --network my-network -e DATABASE_URL=postgres://postgres:password@canvas-postgres:5432 -p 3000:3000 --name backend -d canvas-backend

docker run --network my-network -e DATABASE_URL=postgres://postgres:password@canvas-postgres:5432 -p 3002:3002 --name frontend -d canvas-frontend

docker run --network my-network -e DATABASE_URL=postgres://postgres:password@canvas-postgres:5432 -p 8080:8080 --name ws -d canvas-ws

or

DATABASE_URL=postgres://postgres:password@db:5432/canvas-db docker-compose up --build
