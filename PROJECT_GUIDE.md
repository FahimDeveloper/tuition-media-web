# Tuition Media Web Project Guide

## Overview

Tuition Media Web is the client application for the Tuition Media marketplace flow. It includes the public-facing marketplace experience and the currently active dashboard/demo route tree.

Primary public journeys include:

- home page and marketing sections
- teacher registration and login entry points
- tuition browsing and related discovery flows

This repository does not cover internal CRM workflows, tele-sales operations tooling, backoffice operations systems, or internal commission tooling.

The codebase is currently in an early implementation stage. The structure and conventions are already established, but some pages are still placeholders and some files are present without being wired into the active route tree. New contributors should treat this guide as the source of truth for how to extend the app safely.

## Tech Stack

- `React 19` for UI rendering
- `TypeScript` for application code
- `Vite` for local development and builds
- `React Router` for route configuration and page rendering
- `Redux Toolkit` for global state
- `Redux Persist` for persisted auth state
- `Tailwind CSS v4` for utility styling and design tokens
- `Ant Design` for component theming and UI support

## How the App Starts

The runtime entrypoint is `src/main.tsx`.

Startup flow:

1. Load global styles from `src/index.css`.
2. Mount the React app with `createRoot`.
3. Wrap the app with `Provider` for Redux store access.
4. Wrap with `ConfigProvider` to apply the Ant Design theme.
5. Wrap with `PersistGate` so persisted auth state can rehydrate.
6. Render the router through `RouterProvider`.

Routing currently comes from `src/routers/index.tsx` through `RouterProvider` in `src/main.tsx`.

## Current Route Map

The active route tree has two layout shells:

- `MainLayout` for the public site
- `DashboardLayout` for the dashboard route tree

Current registered routes:

- `/` -> `Home`
- `/login` -> `Login`
- `/signup` -> `Signup`
- `/tuition` -> `Tuition`
- `/dashboard` -> dashboard home
- `/dashboard/profile` -> user profile
- `/dashboard/calendar` -> calendar
- `/dashboard/blank` -> blank page
- `/dashboard/form-elements` -> form demo
- `/dashboard/basic-tables` -> basic tables demo
- `/dashboard/alerts` -> alerts demo
- `/dashboard/avatars` -> avatars demo
- `/dashboard/badge` -> badges demo
- `/dashboard/buttons` -> buttons demo
- `/dashboard/images` -> images demo
- `/dashboard/videos` -> videos demo
- `/dashboard/line-chart` -> line chart demo
- `/dashboard/bar-chart` -> bar chart demo
- `/dashboard/error-404` -> 404 demo
- `*` -> simple `404` fallback

When adding a new screen, update the router explicitly. Creating a page file alone does not make it available in the app.

## Project Structure

Top-level folders you will work with most often:

- `src/pages/`: route-level screens
- `src/components/`: reusable UI and composed layout blocks
- `src/context/`: React context providers, including dashboard sidebar state
- `src/redux/`: store setup, feature reducers, and API helpers
- `src/routers/`: route definitions
- `src/mocks/`: explicit mock and demo data
- `src/hooks/`: typed and reusable hooks
- `src/config/`: runtime configuration and theme setup
- `src/types/`: shared TypeScript definitions
- `src/utils/`: app-wide utility functions
- `public/`: public static files served directly

There is also an `others/` folder in the repository root. It appears to contain draft, reference, or experimental files and is not part of the current runtime app structure. Do not treat it as a source folder for production code.

## Import Conventions

- Use `@/` for internal imports under `src`
- Example: `@/components/layout/home/Hero`
- Avoid introducing new deep relative imports such as `../../..`

## Component Architecture

The component layer follows a strict layered model. Keep new components inside the existing structure instead of introducing a feature-first folder model.

### Layer Responsibilities

- `src/components/layout/`: page composition, shared shell sections, and page-specific section blocks
- `src/components/common/`: reusable cross-app composed components shared by multiple pages
- `src/components/ui/`: low-level reusable UI primitives

### Placement Rules

1. Put route screen composition in `src/pages/*`.
2. Put page sections and app-shell blocks in `src/components/layout/*`.
3. Put reusable business-facing composed components in `src/components/common/*`.
4. Put presentational primitives in `src/components/ui/*`.
5. Co-locate child components and styles when they are used by only one parent.

### Dependency Direction

- `pages` can import from `layout`, `common`, `ui`, hooks, utils, types, and redux.
- `layout` can import from `common`, `ui`, hooks, utils, and types.
- `common` can import from `ui`, hooks, utils, and types.
- `ui` must not import from `layout` or `pages`.
- `redux` must not import UI components.

### Folder Strategy

Use a hybrid structure:

- Start with a single file for simple sections such as `Hero.tsx`.
- Promote a section to its own folder only when local complexity grows.
- Use a folder when the section needs child components, local styles, constants, hooks, types, or tests.

The home page already follows this convention:

- simple sections remain as single files in `src/components/layout/home/`
- more complex sections such as `featuredTeacher` live in their own local folder

### Layout Conventions

Current layout groupings:

- `shared/`: app-shell level components such as `MainLayout`, `Header`, `Footer`, and `ProfileDropdown`
- `home/`: home page sections and their local children
- `tuition/`: tuition listing composition
- `dashboard/`: dashboard shell, header, auth, home, and profile composition

Rules for this layer:

- keep section-specific child components inside the relevant section folder
- keep feature-specific CSS local to that section
- do not place low-level primitives here

### Common Component Conventions

Use `src/components/common/` for reusable composed blocks that are shared across multiple pages.

Current examples:

- brand/logo rendering
- page metadata helpers
- theme/provider wrappers
- cross-app decorative or shared helpers

If a component is dashboard-only or demo-only, keep it under `src/components/layout/dashboard/*`, not `common`. If a component is still only a low-level primitive, it belongs in `ui`, not `common`.

### UI Component Conventions

Use `src/components/ui/` for low-level reusable primitives.

Current groupings:

- `form/`: input and field primitives
- `modal/`: modal wrappers and shells
- `navigation/`: navigation-related primitives

Guidelines:

- keep these components generic
- keep them style-focused
- build business or page-aware composition in `common` or `layout`

## State Management and Data Layer

Global state is configured in `src/redux/store.ts` using Redux Toolkit.

Current setup:

- `auth` is the only registered persisted feature slice
- auth state is persisted with `redux-persist`
- serializable middleware warnings are configured to ignore persist lifecycle actions
- typed hooks are available through `src/hooks/useAppHooks.ts`

Auth state currently stores:

- authenticated user object
- access token
- refresh token

The repository also includes `src/redux/api/baseQuery.ts`, which implements a `fetchBaseQuery` wrapper with refresh-token handling. It prepares the `Authorization` header from persisted auth state and attempts a refresh request when a `401` response is returned.

Important current-state note:

- configuration in `src/config/index.ts` currently hardcodes `activeEnv` to the development environment

That means local development depends on the current config behavior and available environment variables. If environment handling is changed later, the documentation should be updated with the new selection rules.

## Styling and Design System

The app styling system is split across Tailwind CSS and Ant Design theme configuration.

### Tailwind Tokens

Design tokens are declared in `src/index.css` using Tailwind v4 `@theme`.

Available semantic tokens include:

- `brand-50` through `brand-900`
- `surface`
- `surface-subtle`
- `text-strong`
- `text-on-brand`

There are also backward-compatible aliases:

- `primary`
- `secondary`
- `neutral`

Use the semantic tokens where possible instead of adding new hardcoded colors.

### Typography

- `Manrope` is the primary body and UI font
- `Poppins` is used for display and branded headings through the `font-poppins` utility

### Ant Design Theme

Ant Design theme values are defined in `src/config/theme.ts` and aligned with the same visual language:

- primary brand color
- surface/background colors
- border color
- base font family

When introducing Ant Design components, keep them aligned with the existing theme rather than styling them independently.

## Local Development

Install and run:

```bash
npm install
npm run dev
```

Available scripts:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Environment Variables

The current config expects these Vite environment variables:

- `VITE_APP_LIVE_API_URL`
- `VITE_APP_LIVE_AUTH_REFRESH_URL`
- `VITE_APP_LOCAL_API_URL`
- `VITE_APP_LOCAL_AUTH_REFRESH_URL`
- `VITE_APP_TEST_API_URL`
- `VITE_APP_TEST_AUTH_REFRESH_URL`

There is currently no `.env.example` file in the repository. A new developer will need the correct values from the team or the deployment configuration source.

## Contribution Guidelines

### Naming

- use PascalCase for pages, layouts, and components
- use `useX` naming for custom hooks
- keep shared barrels as `index.ts` where the pattern already exists

### Implementation Expectations

- preserve the current layered component architecture
- use TypeScript functional components
- prefer semantic Tailwind tokens instead of hardcoded colors
- keep keyboard focus visible on interactive elements
- build mobile-first and verify at `sm`, `md`, and `lg`
- keep layout and style choices consistent with the existing app

### Before Handoff

For implementation work, the expected verification commands are:

- `npm run lint`
- `npm run build`

For documentation-only changes, those commands are optional unless the change also touches code.

## Known Current-State Notes

These details are useful during onboarding because they explain what is intentional versus what is still in progress:

- `README.md` at the repo root was originally Vite boilerplate and has been replaced with project-specific guidance.
- `Home.tsx` and `Tuition.tsx` now live as flattened single-file public route screens under `src/pages/`.
- dashboard showcase/template pages live under `src/pages/Dashboard/Demo/`.
- the `Tuition` page still renders local mock data from `src/mocks/tuition/tuitionListings.ts`.
- `others/` is not part of the active source structure.
- There is no dedicated automated test setup in the repository yet.

## Recommended First Steps for New Developers

1. Read `README.md` for the quick project overview.
2. Read this guide fully before changing structure or adding new files.
3. Run the app locally and confirm the active route flow.
4. Inspect `src/main.tsx`, `src/routers/index.tsx`, and `src/redux/store.ts` to understand startup, routing, and state.
5. Follow the component placement rules before introducing any new page or shared component.
