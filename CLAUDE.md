# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo overview

**CindiWeb** is a web agency monorepo (pnpm workspaces + Turborepo) with four workspace groups:

| Path | Purpose | Port |
|------|---------|------|
| `apps/web` | Agency marketing site + template gallery | 3000 |
| `apps/crm-admin` | Internal CRM (clients, projects, maintenance billing) | 3001 |
| `templates/*` | Standalone Next.js template sites (8 niches) | 3002–3009 |
| `clients/*` | Deployed client sites (e.g. `el-tenedor`) | 3010+ |
| `packages/ui` | Shared React components + design tokens | — |
| `packages/config` | Shared tsconfig | — |

Package names follow `@cindiweb/<workspace>` (e.g. `@cindiweb/ui`, `@cindiweb/crm-admin`).

## Commands

```bash
# From repo root
pnpm dev              # start all workspaces (concurrency=12)
pnpm build            # build all
pnpm typecheck        # typecheck all
pnpm lint             # lint all
pnpm format           # prettier across repo

# Target a single workspace
pnpm --filter @cindiweb/web dev
pnpm --filter @cindiweb/crm-admin dev
pnpm --filter @cindiweb/el-tenedor dev

# CRM database (run from apps/crm-admin)
pnpm db:generate      # prisma generate
pnpm db:migrate       # prisma migrate dev
pnpm db:studio        # open Prisma Studio
```

## Database setup (crm-admin only)

Requires PostgreSQL. Set `DATABASE_URL` in `apps/crm-admin/.env.local`.

```bash
# Docker quickstart
docker run --name webcraft-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=webcraft_crm -p 5432:5432 -d postgres:16
cd apps/crm-admin && pnpm db:generate && pnpm db:migrate
```

## Architecture

### `packages/ui`

Shared component library consumed by all apps and templates via `import { ... } from '@cindiweb/ui'`. Resolves directly to TypeScript source (`"main": "./src/index.ts"`) — no build step required. Components live in `src/components/`, design tokens in `src/tokens/` (`colors.ts`, `typography.ts`).

### Templates (`templates/*`)

Eight standalone Next.js apps (blog, contractor, ecommerce, event, portfolio, restaurant, saas-landing, salon). Each is an independent workspace that consumes `@cindiweb/ui`. Templates use Next.js 16 + React 19 + Tailwind CSS v4; the `apps/` workspaces are on Next.js 14 + React 18 + Tailwind v3.

### Client sites (`clients/*`)

Deployed client sites generated from templates (e.g. `el-tenedor` is a restaurant template instance). They are independent Next.js apps that also consume `@cindiweb/ui`.

### CRM data model

Four Prisma models: `Client → Project → MaintenanceRequest` and standalone `Touchpoint`. Key enums: `ClientStatus` (LEAD/ACTIVE/PAST), `ProjectStatus`, `ContactMethod`, `MaintenanceType`.

## Adding a new template or client site

1. Create a new directory under `templates/` or `clients/` with a standard Next.js scaffold.
2. Set `"name": "@cindiweb/<slug>"` in `package.json` and pick an unused port.
3. Add `@cindiweb/ui` and `@cindiweb/config` as dependencies.
4. Import shared components: `import { Navbar, Footer, HeroSection } from '@cindiweb/ui'`

## Important

This repo must remain **private**. Clients receive deployed URLs only, never source code.
