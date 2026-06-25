# AGENTS.md

## Project Overview

Personal Knowledge Management (PKM) web application — a "second brain" tool inspired by PARA methodology and Getting Things Done (GTD).

**Architecture:** Monorepo with two apps:
- `apps/api` — ASP.NET Core REST API (C#, .NET 10.0, Clean Architecture)
- `apps/web` — React 19 SPA (TypeScript, Vite, shadcn/ui, Tailwind CSS v4)

**Database:** PostgreSQL 18 (Docker), EF Core with SQLite for dev / Npgsql for prod.

## Setup Commands

```bash
# Install web dependencies
cd apps/web && npm install

# Start PostgreSQL container
make database-up

# Run API (starts DB + watches for changes)
make api

# Run web dev server
make web
```

## Development Workflow

### Makefile Targets (root)

| Command | Description |
|---------|-------------|
| `make` | Show help |
| `make web` | Start web dev server (`npm run dev`) |
| `make api` | Start API + database (`dotnet watch run` + `docker compose up`) |
| `make database-up` | Start PostgreSQL container |
| `make database-down` | Stop PostgreSQL container |

### Web (`apps/web`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Type-check + production build (`tsc -b && vite build`) |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

### API (`apps/api`)

| Command | Description |
|---------|-------------|
| `dotnet watch run` | Run API with hot reload |
| `dotnet build` | Build project |

### Environment Variables

See `.env.example` at repo root. Required for Docker:
- `DB_NAME` — Database name
- `DB_USER` — Database user
- `DB_PASSWORD` — Database password

Copy `.env.example` to `.env` and fill in values.

## Testing Instructions

**No test framework is currently configured.** Neither `apps/api` nor `apps/web` has test files or test scripts defined.

When adding tests:
- **Web:** Use Vitest or Jest. Place test files as `*.test.ts` or `*.test.tsx` next to source or in `__tests__/` directories.
- **API:** Use xUnit or NUnit. Place test projects under `apps/api/tests/` following `*.Tests.csproj` naming.

Always run lint checks before committing:
```bash
cd apps/web && npm run lint
```

## Code Style

### Web (`apps/web`)

- **TypeScript:** Strict mode enabled. Path alias `@/*` maps to `src/*`.
- **Linting:** ESLint flat config with `@typescript-eslint`, `react-hooks`, `react-refresh` plugins.
- **Formatting:** Prettier not configured — follow existing file formatting.
- **Component patterns:** React Server Components not used. Client-side state via Zustand, server state via TanStack React Query.
- **UI:** shadcn/ui components with Radix UI primitives. Lucide icons. Olive base color theme.
- **File organization:** Vertical slice architecture under `src/features/`. Shared UI in `src/components/`.

### API (`apps/api`)

- **Architecture:** Clean Architecture with layers: Web → Application → Infrastructure → Domain.
- **C# conventions:** Follow Microsoft C# Coding Conventions. PascalCase for public members, camelCase for locals.
- **Validation:** FluentValidation for request validation.
- **Mapping:** Mapperly for object-to-object mapping.
- **Logging:** Serilog configured.
- **API docs:** NSwag for OpenAPI/Swagger generation.

### Git Conventions

- Commit messages: Conventional Commits format (`feat:`, `fix:`, `docs:`, etc.)
- Branch naming: `feature/description`, `fix/description`, `refactor/description`

## Architecture Notes

### API Clean Architecture Layers

```
Web (Controllers, Validators, HTTP)
  ↓
Application (Commands, Queries, DTOs, Business Logic)
  ↓
Infrastructure (EF Core DbContext, Repositories, JWT, Identity)
  ↓
Domain (Entities, Errors, Repository Interfaces)
```

- Composition Root wires dependencies at startup.
- Application layer depends only on Domain (no infrastructure references).
- Infrastructure implements Domain interfaces.

### Web Vertical Slice Architecture

```
src/
  app/          — Router, route definitions, provider setup
  features/     — Domain-scoped feature modules (auth, entries, workspaces)
  components/   — Shared UI (layouts, sidebar, shadcn primitives)
  lib/          — API client (axios), React Query config, utilities
```

- Each feature under `features/` is self-contained: components, hooks, API calls, types.
- Avoid cross-feature imports. Share via `components/` or `lib/`.
- API client configured with axios base URL from environment.

## Build and Deployment

### Docker

- `docker-compose.yml` defines PostgreSQL 18-alpine service only.
- API and Web are not containerized — run directly via Makefile during development.

### Production Build

```bash
# Web production build
cd apps/web && npm run build
# Output: apps/web/dist/

# API publish
cd apps/api && dotnet publish -c Release
```

## Pull Request Guidelines

- Title format: `type(scope): description` (Conventional Commits)
- Required checks before merge:
  - `cd apps/web && npm run lint` passes
  - `cd apps/web && npm run build` passes
  - `cd apps/api && dotnet build` passes
- Run all tests if tests have been added.

## Additional Notes

- **Path aliases:** Web uses `@/*` → `src/*`. API uses standard .NET namespace resolution.
- **Database migrations:** EF Core migrations managed via `dotnet ef` commands. Check `apps/api/Infrastructure/` for DbContext.
- **Authentication:** JWT bearer tokens with ASP.NET Core Identity. Web client stores tokens and attaches to API requests.
- **Rich text editor:** BlockNote used for entry content editing in web app.
- **No CI/CD pipeline configured yet.** GitHub Actions or similar should be added for automated checks.