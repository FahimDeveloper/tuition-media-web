# Tuition Media Web

Client application for the Tuition Media marketplace flow. This repository contains the teacher-facing public browsing experience plus the currently active dashboard/demo route tree.

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Redux Toolkit + Redux Persist
- Tailwind CSS v4
- Ant Design

## Quick Start

```bash
npm install
npm run dev
```

## Available Commands

- `npm run dev`: start the local Vite development server
- `npm run build`: run the TypeScript build and create a production bundle
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint across the project

## Documentation

- Full developer onboarding guide: [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)

## Notes

- This repository is for the marketplace client app and its current dashboard/demo surface, not internal CRM or backoffice tooling.
- Some pages and flows are still placeholders. See `PROJECT_GUIDE.md` for the current implementation state and architecture details.
- Internal source imports use the `@/` alias for `src/*`.
