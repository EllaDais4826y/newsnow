FROM node:20.12.2-alpine AS builder
WORKDIR /usr/src
COPY . .
RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM node:20.12.2-alpine
WORKDIR /usr/app
COPY --from=builder /usr/src/dist/output ./output
# Default port changed to 3000 for local dev convenience
ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production
EXPOSE $PORT
# Add tini as init process to handle signals properly
# Install tini and curl (curl used for healthcheck)
RUN apk add --no-cache tini curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:$PORT/ || exit 1
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "output/server/index.mjs"]
