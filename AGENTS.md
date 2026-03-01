# Repository Guidelines

## Project Structure & Module Organization

This project follows a layered (type-first) frontend architecture. Keep contributions within the existing structure:

- `src/pages/`: route-level screens (for example `Home`, `Login`, `Tuition`).
- `src/components/`: reusable UI, organized into `layout`, `common`, and `ui`.
- `src/redux/`: store setup, API integration, and feature state.
- `src/routers/`: route configuration.
- `src/hooks/`, `src/config/`, `src/types/`, `src/utils/`: shared app logic and definitions.
- `public/` and `src/assets/`: static assets.

Do not introduce a new feature-first folder model in this repository; extend current patterns.

## Build, Lint, and Local Development Commands

- `npm run dev`: start local development server with Vite.
- `npm run build`: run TypeScript project build and create production bundle.
- `npm run preview`: serve the built app locally for verification.
- `npm run lint`: run ESLint checks across the codebase.

## Coding Style & Naming Conventions

Use TypeScript with React functional components.

- Keep naming consistent: PascalCase for components/pages/layouts (for example `MainLayout.tsx`).
- Use `useX` naming for custom hooks (for example `useAppHooks.ts`).
- Keep shared barrels as `index.ts` where already used.
- Follow the existing code style in nearby files and keep imports/module boundaries clean.

## Scope Boundaries (Client App)

This repository is for the public client marketplace flow:

- Teacher registration/login and profile-facing flows
- Tuition browsing/filtering and apply flow
- Guardian lead/contact form submission

Out of scope here: internal CRM workflows, internal notes, tele-marketing/tele-sales dashboards, and backoffice commission operations.

## Commit & Pull Request Guidelines

- Use concise, imperative commit messages; prefer Conventional Commit prefixes (`feat:`, `fix:`, `chore:`).
- Keep commits focused on one change.
- PRs should include: what changed, why it changed, UI screenshots (if applicable), and local verification steps (`npm run lint`, `npm run build`).

## Security & Configuration Notes

- Never commit secrets or credentials.
- Do not expose private/internal data in public UI responses.
- Document newly introduced environment variables in project docs.
