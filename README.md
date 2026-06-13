# xeeno

**Scaffold TypeScript CLI tools and backend APIs in 30 seconds. Optimized for humans and AI.**

[xeeno.app](https://xeeno.app) — [GitHub](https://github.com/neiforfaen/xeeno) — [Docs](https://docs.xeeno.app)

---

## What Is xeeno?

A zero-config TypeScript scaffolder that eliminates setup friction. Stop configuring build tools, databases, and testing frameworks. Start writing code.

```bash
npm create xeeno my-api
# Choose: framework, database (optional)
# Done. Start coding.
```

**That's it.** You get:

- ✅ TypeScript + esbuild (pre-configured)
- ✅ Framework ready (Hono/Express/Fastify)
- ✅ Database + migrations (Drizzle ORM, optional)
- ✅ Validation with type inference (Zod)
- ✅ Testing configured (Vitest)
- ✅ Linting + formatting (Biome)
- ✅ Predictable structure (AI-friendly)

**No config files to learn. No dependency hell. No boilerplate to delete.**

---

## Why xeeno?

### The Problem

When you start a TypeScript project, you face 2-4 hours of decisions:

- Which framework? (Express? Fastify? Hono?)
- How do I set up the build system?
- Which ORM? How do migrations work?
- How do I make validation and types work together?
- What's the folder structure?
- How do I test this?
- How many config files do I need?

By the time you answer these, momentum is gone.

### The Solution

xeeno makes these decisions _once_. You get a solid baseline. No bikeshedding. No config hell.

---

## Quick Start

### Installation

```bash
npm create xeeno@latest my-project
cd my-project
pnpm install
pnpm dev
```

### Interactive Setup

```
✔ Project name? … my-api
✔ Framework? … Hono
  ○ Hono
  ○ Express
  ○ Fastify
✔ Include database? (Drizzle ORM) … yes
  ○ PostgreSQL
  ○ SQLite
  ○ MySQL
✔ Package manager? … pnpm
```

### You're Ready

```bash
# Start developing
pnpm dev

# Run tests
pnpm test

# Format & lint
pnpm format
pnpm lint

# Build for production
pnpm build
```

---

## What's Included

### Framework (Pick One)

**Hono** (default)

- Ultra-lightweight
- Runs on Node.js, Deno, Bun, Cloudflare Workers
- Minimal overhead, maximum speed

```typescript
import { Hono } from "hono"
import { z } from "zod"

const app = new Hono()

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
})

app.get("/users/:id", async (c) => {
  const id = c.req.param("id")
  // Your code here
  return c.json({ id, email: "user@example.com" })
})

export default app
```

**Express** or **Fastify** available as options.

### Database + ORM (Optional)

**Drizzle ORM** — Type-safe SQL queries, auto-generated migrations

```typescript
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
})
```

Everything is typed. TypeScript knows:

- ✅ Which columns exist
- ✅ Which fields are nullable
- ✅ What queries return

No runtime surprises.

### Validation

**Zod** — Schema validation + TypeScript type inference

```typescript
const CreateUserSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(1).max(256),
})

// Validation happens automatically
app.post("/users", async (c) => {
  const body = await c.req.json()
  const parsed = CreateUserSchema.parse(body) // Throws if invalid
  // Use `parsed` knowing it's the right shape
})
```

### Testing

**Vitest** — Zero-config, ESM-first, fast

```typescript
import { describe, it, expect } from "vitest"
import app from "../src/index"

describe("GET /users/:id", () => {
  it("returns a user", async () => {
    const res = await app.request("/users/1")
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toHaveProperty("id")
  })
})
```

Run tests with `pnpm test`. No setup required.

### Linting + Formatting

**Biome** — ESLint + Prettier in one tool

```bash
pnpm lint       # Check code quality
pnpm format     # Auto-format
```

One config file (`biome.json`). No conflicts. No plugins to manage.

---

## Project Structure

```
src/
├── index.ts          # Entry point, app setup
├── routes/           # Route definitions
├── handlers/         # Request handlers (business logic)
├── db/
│   ├── schema.ts     # Drizzle ORM schema
│   └── client.ts     # Database client
├── schemas/          # Zod validation schemas
└── types/            # TypeScript types (auto-generated from above)

tests/
├── routes.test.ts
└── handlers.test.ts

.env.example          # Environment variables template
biome.json            # Linting & formatting
tsconfig.json         # TypeScript configuration
vitest.config.ts      # Test configuration
drizzle.config.ts     # Database configuration (if selected)
```

You know exactly where to add code. AI knows too.

---

## CLI Tools

Building a CLI? xeeno includes **Commander** for argument parsing:

```typescript
import { Command } from "commander"

const program = new Command()

program
  .command("deploy <service>")
  .description("Deploy a service")
  .option("-e, --env <env>", "Environment", "staging")
  .action(async (service, options) => {
    console.log(`Deploying ${service} to ${options.env}`)
  })

program.parse()
```

Get argument parsing, validation, help text, subcommands — all automatically.

---

## AI-Optimized Development

xeeno is designed to work great with AI code generation (Claude Code, Cursor, Copilot).

**Why?**

1. **Explicit type contracts** — Zod schemas are the source of truth
2. **Predictable structure** — AI learns patterns from one example
3. **No ambiguity** — Framework conventions are clear
4. **Type safety end-to-end** — AI generates code that compiles

**Example: "Add a CRUD endpoint for posts"**

```typescript
// 1. Define the schema (your responsibility)
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content"),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
})

// 2. AI generates the rest (handlers, routes, validation)
// - List posts with pagination
// - Get single post
// - Create post
// - Update post
// - Delete post
// All typed. All validated. All consistent.
```

---

## Commands

```bash
# Development
pnpm dev              # Start dev server with hot reload

# Testing
pnpm test             # Run all tests
pnpm test --watch     # Watch mode
pnpm test:ui          # Vitest UI

# Code Quality
pnpm lint             # Check with Biome
pnpm format           # Format with Biome
pnpm format --check   # Check if formatted

# Database
pnpm db:push          # Push schema to database
pnpm db:generate      # Generate migration files
pnpm db:studio        # Open Drizzle Studio (visual DB editor)

# Production
pnpm build            # Build for production
pnpm start            # Run production build
```

---

## Configuration

xeeno comes pre-configured. Most projects need zero changes to:

- `tsconfig.json`
- `vitest.config.ts`
- `biome.json`

If you need to customize, each file is well-commented and minimal.

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit with your values:

```
DATABASE_URL=postgresql://user:password@localhost/dbname
NODE_ENV=development
```

---

## Examples

### Hello World API

```typescript
// src/index.ts
import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => c.json({ message: "Hello, world!" }))

export default app
```

```bash
pnpm dev
# Visit http://localhost:3000
```

### Database + Validation

```typescript
// src/schemas/user.ts
import { z } from "zod"

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>
```

```typescript
// src/handlers/users.ts
import { CreateUserSchema } from "../schemas/user"
import { db } from "../db/client"
import { users } from "../db/schema"

export async function createUser(input: unknown) {
  const parsed = CreateUserSchema.parse(input)
  const user = await db.insert(users).values(parsed).returning()
  return user[0]
}
```

```typescript
// src/routes/users.ts
import { Hono } from "hono"
import { createUser } from "../handlers/users"
import { CreateUserSchema } from "../schemas/user"

const router = new Hono()

router.post("/", async (c) => {
  try {
    const body = await c.req.json()
    const user = await createUser(body)
    return c.json(user, 201)
  } catch (error) {
    return c.json({ error: "Invalid input" }, 400)
  }
})

export default router
```

---

## Roadmap

### Current (MVP — in progress)

- ✅ CLI scaffolder
- ✅ Hono/Express/Fastify support
- ✅ Drizzle ORM integration
- ✅ Zod validation
- ✅ Vitest testing
- ✅ Biome linting
- ✅ Basic documentation

### Future

- Premium templates (SaaS starter, Stripe integration, GraphQL)
- GitHub Actions templates
- Database connection helpers (easy postgres/sqlite setup)
- One-click deployment (Vercel, Railway, fly.io)
- AI-native features (automatic test generation, migration suggestions)

---

## Contributing

xeeno is open source. We're looking for:

- Bug reports
- Feature requests
- Template contributions
- Documentation improvements

[GitHub Issues](https://github.com/neiforfaen/xeeno/issues)

---

## License

MIT

---

## Support

- 📖 [Full Documentation](https://docs.xeeno.app)
- 🐛 [GitHub Issues](https://github.com/neiforfaen/xeeno/issues)
- 📧 [hello@xeeno.app](mailto:hello@xeeno.app)

---

**Stop configuring. Start building.**
