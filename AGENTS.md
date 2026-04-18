# Repository Guidelines

## Project Overview

This repository is the public client application for Tuition Media.

Primary product surface in this repo:

- public marketplace and marketing pages
- teacher/tutor sign-in and sign-up
- tuition discovery/listing UI
- the currently wired dashboard/demo route tree

Out of scope here:

- internal CRM or backoffice tooling
- tele-sales operations tools
- private internal workflows

## Source of Truth

- `AGENTS.md`: compact execution guide for repo-aware edits
- `PROJECT_GUIDE.md`: broader onboarding and architecture reference
- the codebase: final authority when docs disagree

Prefer the codebase over older documentation if you find drift.

## Current Runtime State

Work from the current implementation, not the intended future product state.

- The active app entrypoint is `src/main.tsx`.
- Routing comes from `src/routers/index.tsx`.
- Public routes are `/`, `/tuition`, `/login`, and `/signup`.
- `/dashboard/*` is an active private route tree behind `src/routers/PrivateRoute.tsx`.
- Auth forms are implemented and wired to RTK Query auth endpoints.
- Tuition listing UI is still driven by local demo data from `src/mocks/tuition/tuitionListings.ts`.
- Tuition search/filter controls are placeholder UI right now.
- Much of the dashboard surface is template/demo-oriented and still contains TailAdmin copy/metadata.
- `src/config/index.ts` currently hardcodes `activeEnv` to `DEVELOPMENT`.
- `others/` is scratch/reference material, not runtime source.
- No test suite or CI config was detected in the repo.

Important current-state corrections to preserve:

- Header auth visibility is derived from Redux auth state, not a hardcoded logged-in mock.
- `ProfileDropdown` reads the persisted auth user and falls back only when fields are missing.
- `ProfileDropdown` includes a `/dashboard/settings` link, but that route is not registered yet.

## Tech Stack

- React 19
- TypeScript with `strict` mode enabled
- Vite 7
- React Router DOM 7 using `createBrowserRouter`
- Redux Toolkit
- RTK Query
- Redux Persist
- Tailwind CSS v4
- Ant Design 6
- `react-helmet-async` for page metadata
- `sweetalert2` for logout feedback

Also present, mostly in dashboard/demo areas:

- FullCalendar
- ApexCharts
- Swiper
- `@react-jvectormap`

## Development Commands

- `npm run dev`: start the Vite dev server
- `npm run build`: TypeScript build plus production bundle
- `npm run preview`: preview the production build
- `npm run lint`: run ESLint

Use `npm`, not `yarn`, for commands unless the user asks otherwise.

## Environment and Config

- `.env` exists in-repo; no `.env.example` was found.
- Runtime config lives in `src/config/index.ts`.
- Current environment keys:
  - `VITE_APP_LOCAL_API_URL`
  - `VITE_APP_LOCAL_AUTH_REFRESH_URL`
  - `VITE_APP_TEST_API_URL`
  - `VITE_APP_TEST_AUTH_REFRESH_URL`
  - `VITE_APP_LIVE_API_URL`
  - `VITE_APP_LIVE_AUTH_REFRESH_URL`
- Do not assume automatic env switching. `activeEnv` is manually set in code right now.
- If you change environment selection logic, update docs in the same task.

Build config details worth preserving:

- `vite.config.ts` defines the `@/` alias for `src/*`
- SVGs can be imported as React components through `vite-plugin-svgr` named export `ReactComponent`

## Project Structure

- `src/pages/`: route-level pages
- `src/components/layout/`: page sections and shell composition
- `src/components/common/`: reusable composed/shared blocks
- `src/components/ui/`: low-level reusable primitives
- `src/redux/`: store setup, slices, and RTK Query
- `src/context/`: theme and dashboard sidebar contexts
- `src/routers/`: route tree and route guards
- `src/mocks/`: explicit local mock/demo data
- `src/hooks/`: typed/shared hooks
- `src/config/`: runtime config and Ant Design theme setup
- `src/types/`: shared TypeScript types
- `src/utils/`: shared utilities
- `src/icons/`: SVG icon exports
- `public/`: public static assets and brand images

Layout groupings currently in use:

- `src/components/layout/shared/*`: public shell pieces like `Header`, `Footer`, `MainLayout`, `ProfileDropdown`
- `src/components/layout/home/*`: home page sections
- `src/components/layout/home/featuredTeacher/*`: a more complex section module with local CSS
- `src/components/layout/auth/*`: auth shell, form styles, and auth forms
- `src/components/layout/tuition/*`: tuition listing composition
- `src/components/layout/dashboard/*`: dashboard shell, dashboard-only shared blocks, and demo/dashboard sections

## Layering Rules

Keep the existing layered structure. Do not introduce a feature-first architecture unless the user explicitly asks for it.

Placement order:

1. route composition -> `src/pages/*`
2. page/app-shell composition -> `src/components/layout/*`
3. shared composed blocks -> `src/components/common/*`
4. low-level primitives -> `src/components/ui/*`

Dependency direction:

- `pages` may import from `layout`, `common`, `ui`, hooks, utils, types, redux, config
- `layout` may import from `common`, `ui`, hooks, utils, types, config
- `common` may import from `ui`, hooks, utils, types
- `ui` must not import from `layout` or `pages`
- `redux` must not import UI

Folder strategy:

- Keep simple sections as single files.
- Create a local folder only when a section needs child components, local CSS, constants, hooks, types, or tests.
- Follow the home page pattern: simple sections stay single-file, more complex ones get a folder.
- Keep `src/components/common/*` limited to genuinely cross-app shared pieces; dashboard-only helpers belong under `src/components/layout/dashboard/*`.

## Routing and Layout Patterns

Active route shells:

- `MainLayout` for public pages
- `AuthLayout` for `/login` and `/signup`
- `DashboardLayout` -> re-export of `src/components/layout/dashboard/shell/AppLayout.tsx`

Dashboard shell behavior:

- uses `SidebarProvider` from `src/context/dashboard/SidebarContext.tsx`
- wraps nested dashboard routes with `AppHeader`, `AppSidebar`, and `Backdrop`

Route guard behavior:

- `PrivateRoute` redirects to `/login`
- the current guard considers the user authenticated only when both `user` and `accessToken` are missing

When adding or moving pages:

- update `src/routers/index.tsx` explicitly
- do not assume a page file becomes reachable on its own
- update `PageMeta` on route pages when user-facing titles/descriptions change

## State, Auth, and API Patterns

Global state lives in `src/redux/store.ts`.

Current state/data setup:

- `rootReducers` and `rootMiddlewares` are assembled in `src/redux/features/rootFeatures.ts`
- `auth` is the only persisted feature slice
- persistence uses `redux-persist/lib/storage`
- typed hooks live in `src/hooks/useAppHooks.ts`
- RTK Query base API is `authApiSlice` in `src/redux/api/httpSlice.ts`

API/auth behavior to preserve:

- `baseQueryWithRefreshToken` adds `Authorization: Bearer <token>` when an access token exists
- requests use `credentials: 'include'`
- a `401` triggers refresh via `baseUrl.AUTH_REFRESH_URL`
- refresh success dispatches `loggedInUser`
- refresh failure dispatches `loggedOutUser`

Current auth endpoints:

- `POST /auth/teacher/login`
- `POST /auth/teacher/registration`

Backend field naming is mixed and should be preserved where already established:

- request payloads use snake_case keys like `first_name` and `last_name`
- auth user data also includes fields like `isProfileCompleted`, `profile_image`, and `profileImage`

Do not "clean up" backend naming conventions in API types unless you are doing a deliberate adapter refactor.

## Styling and UI Conventions

The repo uses Tailwind utilities for most UI and Ant Design for forms/themeable components.

### Tailwind and Tokens

- Design tokens are defined in `src/index.css` with Tailwind v4 `@theme`
- Prefer semantic tokens first:
  - `brand-50` to `brand-950`
  - `surface`
  - `surface-subtle`
  - `text-strong`
  - `text-on-brand`
- Backward-compatible aliases such as `primary`, `secondary`, and `neutral` still exist
- Avoid introducing new hardcoded hex colors when an existing token fits

### Typography

- Base font: `Manrope`
- Display/brand headings: `font-poppins`

### Dark Mode

- theme state lives in `src/context/ThemeContext.tsx`
- current preference is stored in `localStorage` under `theme`
- the app toggles the `dark` class on `document.documentElement`
- Ant Design theme values are derived from the same mode in `src/config/theme.ts`

### Public Site Visual Direction

Match the established public styling in:

- `src/components/layout/shared/Header.tsx`
- `src/components/layout/shared/Footer.tsx`
- `src/components/layout/home/Hero.tsx`
- `src/components/layout/home/BecomeTutor.tsx`
- `src/components/layout/home/featuredTeacher/*`

Characteristics already in use:

- blue-led brand palette
- soft light surfaces
- rounded corners and soft shadows
- bold editorial headings
- visible `focus-visible` rings
- mobile-first layouts with `max-w-7xl px-4 sm:px-6 lg:px-8`

### Ant Design Usage

- `ThemedConfigProvider` wraps the app in `main.tsx`
- Auth forms are built with Ant Design `Form`, `Input`, `Select`, and `Button`
- Shared auth form styling lives in `src/components/layout/auth/formStyles.ts`
- When touching auth UI, prefer reusing those shared class constants instead of restyling fields ad hoc

### Dashboard Styling

- Dashboard/demo screens still use many gray token utilities and TailAdmin-derived patterns
- Do not force public-marketplace styling onto the dashboard unless the task is explicitly productizing it

## Naming and Code Conventions

- Use TypeScript functional components
- Components/pages/layouts: PascalCase
- Hooks: `useX`
- Reuse existing `index.ts` barrels where they already exist
- Prefer `@/` imports over deep relative paths

Formatting expectations:

- No Prettier config was found
- The codebase has mixed quote/semicolon style between files
- Follow the surrounding file's formatting instead of reformatting broadly
- Keep edits minimal and avoid style-only churn

Component implementation patterns already used:

- larger components often extract long Tailwind strings into local constants
- page-level metadata uses `PageMeta`
- brand assets are wrapped through `BrandLogo`

## Product Terminology to Preserve

The repository name is Tuition Media, but the current user-facing brand copy is mostly `TutoriumBD`.

Preserve current product language unless the task is explicitly rebranding:

- tutor / teacher account
- tuition opportunities / tuition leads
- guardians and students
- Bangladesh-specific locations and phone numbers

Repo-specific domain details already encoded in the app:

- sign-up validates Bangladeshi mobile numbers (`01...` or `+8801...`)
- sign-up city/location options are Bangladesh-specific
- auth endpoints are teacher-focused

Be careful not to mix internal wording, placeholder dashboard wording, and public marketplace copy.

## Demo and Placeholder Areas

Treat these areas carefully:

- `src/mocks/tuition/tuitionListings.ts` is demo content, not production data
- tuition filter/search controls are placeholder UI
- many dashboard pages still contain TailAdmin page titles/descriptions and demo content
- `others/` is not a production source folder

Do not copy demo/template strings or data into product-facing features unless the task is explicitly scaffolding or converting them.

## Safe Editing Guidance

- Keep changes tightly scoped to the user's request
- Update docs when architecture, environment behavior, or workflow expectations change
- Preserve route wiring, auth persistence, and refresh-token behavior unless the task is specifically about changing them
- If you refactor auth-related code, inspect `Header`, `ProfileDropdown`, and `PrivateRoute` together
- If you touch page metadata in dashboard routes, check whether TailAdmin placeholder copy should be replaced as part of the task
- Do not add new routes such as `/dashboard/settings` without wiring them properly
- Do not use `others/` as a source of truth for implementation patterns
- Do not propagate placeholder tuition/demo data into real flows

## Validation Expectations

For code changes, prefer running:

- `npm run lint`
- `npm run build`

Notes:

- there is no separate `test` script
- there is no dedicated `typecheck` script; `npm run build` is the effective type check
- for docs-only edits, call out if runtime validation was not necessary or not run

## Communication Expectations

When reporting back to the user:

- summarize what changed and why
- mention validation performed, or say clearly when it was not run
- call out uncertainties instead of inventing conventions
- keep explanations concise unless the user asks for more depth
