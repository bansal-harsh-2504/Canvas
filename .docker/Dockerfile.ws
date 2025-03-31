FROM node:20

WORKDIR /usr/src/project

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY ./apps/ws-backend ./apps/ws-backend
COPY ./packages ./packages

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

WORKDIR /usr/src/project/packages/db
RUN pnpm exec prisma generate

WORKDIR /usr/src/project/apps/ws-backend
RUN pnpm run build


WORKDIR /usr/src/project

EXPOSE 8080

CMD ["pnpm", "run", "start:ws"]
