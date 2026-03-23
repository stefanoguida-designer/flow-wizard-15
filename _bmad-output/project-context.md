---
project_name: 'Logto Manager'
user_name: 'Stefano'
date: '2026-03-16'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 18
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **React** 18.3.x, **React DOM** 18.3.x — functional components, hooks only.
- **Vite** 5.4.x — build tool; `base: "/flow-wizard-15/"` in `vite.config.ts` (do not remove; required for GitHub Pages).
- **TypeScript** 5.8.x — ESNext, `moduleResolution: "bundler"`, `strict: false`, path alias `@/*` → `./src/*`.
- **React Router DOM** 6.30.x — `BrowserRouter` with **basename `/flow-wizard-15`**; all in-app navigation must use `<Link to="...">` or `<NavLink to="...">` (paths relative to basename, e.g. `/teams`, `/users`). Never use plain `<a href="...">` for app routes (causes full reloads and 404s on GitHub Pages).
- **Tailwind CSS** 3.4.x — utility-first; use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for conditional classes.
- **UI:** Radix UI primitives via shadcn-style components in `src/components/ui/`; **lucide-react** for icons.
- **Forms:** react-hook-form 7.x, **Zod** 3.x, **@hookform/resolvers** for schema validation.
- **Data:** TanStack React Query 5.83.x for server state.
- **Deploy:** GitHub Pages via **gh-pages**; `npm run deploy` = build + publish `dist`. Public assets and 404 handling live under `public/` (e.g. `public/404.html` for SPA fallback).

---

## Critical Implementation Rules

### Routing & navigation

- **Always use React Router for in-app links.** Use `<Link to="...">` or `<NavLink to="...">` with paths relative to the app (e.g. `to="/teams"`, `to="/users"`). The router uses `basename="/flow-wizard-15"`; do not hardcode the basename in `to` props.
- **Do not use `<a href="...">` for internal routes.** It triggers a full page load and breaks on GitHub Pages (404 or wrong base path). Reserve `<a href>` for external URLs only (e.g. `https://...`).

### Imports and path alias

- **Use the `@/` alias for all src imports:** `@/components/...`, `@/lib/...`, `@/contexts/...`, `@/hooks/...`, `@/pages/...`. Avoid deep relative paths when an `@/` path is available.

### TypeScript

- Project uses **relaxed strictness** (`strict: false`, `noImplicitAny: false`). Match existing style; do not introduce stricter options unless the team agrees. Use TypeScript for types and interfaces where it already exists.

### Components and styling

- **Prefer existing UI building blocks:** use `src/components/ui/` and layout components (`AppLayout`, `AppSidebar`) rather than introducing new low-level primitives.
- **Class names:** use the `cn()` helper from `@/lib/utils` for conditional or combined Tailwind classes (e.g. `cn("base-classes", condition && "extra")`).

### Forms

- Use **react-hook-form** with **Zod** schemas and **@hookform/resolvers** for validation. Follow existing form patterns in the codebase (e.g. `useForm` + `zodResolver`).

### File and naming conventions

- **Components/pages:** PascalCase filenames (e.g. `TeamDetailPage.tsx`, `AppLayout.tsx`).
- **Hooks/utils:** camelCase (e.g. `use-toast.ts`, `utils.ts`).
- **Structure:** route components in `src/pages/`, shared UI in `src/components/` (layout, ui, flows), shared logic in `src/contexts/`, `src/lib/`, `src/hooks/`.

### GitHub Pages and 404

- The app is a SPA; `public/404.html` redirects failed routes to the app and restores the URL via `sessionStorage` + `history.replaceState`. Do not remove or break this script. In `index.html`, the pre-SPA script that restores the stored path must run before the root React app mounts.

### Critical don’ts

- **Do not** use plain `href` for internal navigation; use React Router `Link`/`NavLink` only.
- **Do not** change Vite `base` or Router `basename` without updating the other and the 404/pre-SPA redirect logic.
- **Do not** add new global state solutions without checking existing use of React Query and `AuthContext`; prefer those patterns for server and auth state.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-03-16
