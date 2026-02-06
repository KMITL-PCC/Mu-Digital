FROM node:22-slim AS base
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl ca-certificates

COPY package.json package-lock.json* ./

FROM base AS deps
RUN npm ci

FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# เปิด Polling เพื่อให้ Hot Reload ทำงานได้ดีบน Windows/WSL2/Mac
ENV WATCHPACK_POLLING=true

CMD ["npm", "run", "dev"]


FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 4000
ENV PORT 4000

CMD ["node", "server.js"]