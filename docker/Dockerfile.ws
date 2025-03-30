FROM node:20

WORKDIR /usr/src/project/apps/

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

COPY . .

RUN pnpm run build

RUN cd packages/db && pnpm prisma generate

EXPOSE 8080

CMD ["pnpm", "run", "start:ws"]
