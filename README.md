# Project Setup Instructions

## Install Dependencies

Run the following command to install dependencies:

```
pnpm i
```

## Run PostgreSQL Locally Using Docker

Start a PostgreSQL container with:

```
docker run -e POSTGRES_PASSWORD=password -d -p 5432:5432 --name canvas-postgres postgres
```

## Generate Prisma Client

Navigate to the `packages/db` directory and run:

```
cd packages/db
pnpm prisma generate
```

## Build the Project

Run the build command in all folders except `web`:

```
pnpm run build
```

## Start the Development Server

Run the development server in all folders except `web`:

```
pnpm run dev
```

## View Data in PostgreSQL Database

Navigate to the `packages/db` directory and open Prisma Studio:

```
cd packages/db
pnpm exec prisma studio
```
