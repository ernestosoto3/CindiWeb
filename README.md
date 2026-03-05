# WebCraft Agency — Monorepo

Next.js + pnpm workspaces + Turborepo + PostgreSQL + Prisma

## Structure

```
/apps
  /web          → Agency site + template previews (port 3000)
  /crm-admin    → Internal CRM (port 3001)
/packages
  /ui           → Shared components + design tokens
  /config       → Shared tsconfig
```

## First-time setup

### 1. Prerequisites

```bash
node --version   # must be >= 20
npm i -g pnpm    # install pnpm globally
pnpm --version   # confirm >= 9
```

### 2. Clone and install

```bash
git clone <your-repo-url>
cd webcraft-agency
pnpm install     # installs all workspaces in one shot
```

### 3. Environment variables

```bash
cp .env.example apps/crm-admin/.env.local
# Edit apps/crm-admin/.env.local with your real values:
#   DATABASE_URL — your local Postgres connection string
#   STRIPE_SECRET_KEY — from Stripe dashboard
#   STRIPE_WEBHOOK_SECRET — from Stripe dashboard
```

### 4. Database setup

You need PostgreSQL running locally. Quickest way:

```bash
# Option A: Docker (recommended)
docker run --name webcraft-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=webcraft_crm -p 5432:5432 -d postgres:16

# Option B: Homebrew (Mac)
brew install postgresql@16 && brew services start postgresql@16
createdb webcraft_crm
```

Then run migrations:

```bash
cd apps/crm-admin
pnpm db:generate   # generates Prisma client
pnpm db:migrate    # runs migrations against your DB
pnpm db:studio     # opens Prisma Studio (visual DB browser) — optional
```

### 5. Run everything

```bash
# From repo root — starts both apps in parallel
pnpm dev

# Or run individually
pnpm --filter @webcraft/web dev        # agency site → http://localhost:3000
pnpm --filter @webcraft/crm-admin dev  # crm admin  → http://localhost:3001
```

## Common commands

```bash
pnpm build                          # build all apps
pnpm typecheck                      # typecheck all packages
pnpm lint                           # lint all packages
pnpm format                         # format all files with prettier

# Run a command in a specific app only
pnpm --filter @webcraft/web <cmd>
pnpm --filter @webcraft/crm-admin <cmd>
```

## Adding a new template

Templates live in `/apps/web`. Each template is a Next.js route:

```bash
# Example: add restaurant template
mkdir apps/web/src/app/templates/restaurant
touch apps/web/src/app/templates/restaurant/page.tsx
```

Import shared components from `@webcraft/ui`:

```tsx
import { Navbar, Footer, Button } from '@webcraft/ui'
```

## Adding a shared UI component

1. Create the component in `packages/ui/src/components/`
2. Export it from `packages/ui/src/index.ts`
3. Use it in any app via `import { YourComponent } from '@webcraft/ui'`

## IP Protection

- This repo must stay **private** on GitHub at all times
- Clients never receive source code — they get access to their deployed site
- The monorepo is your business asset
