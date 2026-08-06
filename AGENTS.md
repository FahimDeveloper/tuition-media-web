# AGENTS.md

## Project

Tuition Media (TutoriumBD) client app.

The app is a public tuition marketplace plus a private tutor dashboard.

Current flows:

- `/` public home
- `/demo-class` public demo class booking
- `/tuitions` public tuition jobs list
- `/tuitions/:id` public tuition job details
- `/hub` public tutor hub
- `/hub/:id` public tutor details
- `/login` teacher login
- `/signup` teacher registration
- `/tutor/*` private tutor dashboard

Includes:

- marketplace and marketing UI
- teacher auth
- public tuition job discovery
- public tutor discovery
- lead/demo-class form flow
- private tutor dashboard/profile/job-board pages
- some demo/template dashboard sections

Excludes:

- CRM/internal admin tools
- production test/CI assumptions

---

## Source Of Truth

1. Codebase
2. This file

When this file conflicts with code, inspect the code first and update this file if needed.

---

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Router DOM 7
- Redux Toolkit + RTK Query
- Redux Persist
- Tailwind CSS v4
- Ant Design 6
- React Helmet Async
- SweetAlert2
- SVG icons through `vite-plugin-svgr`

Package manager artifacts currently include `yarn.lock`; `package.json` scripts use npm-compatible commands.

---

## Entry & Providers

Entry:

- `src/main.tsx`

Startup provider order:

1. `ThemeProvider`
2. `AppWrapper`
3. Redux `Provider`
4. `ThemedConfigProvider`
5. Redux Persist `PersistGate`
6. React Router `RouterProvider`

Keep this order unless there is a specific reason to change provider ownership.

---

## Routing

Main router:

- `src/routers/index.tsx`

Tutor dashboard route config:

- `src/routers/tutor.routes.tsx`

Route generation helpers:

- `src/utils/routes.utils.ts`
- `src/utils/navigation.utils.ts`

Rules:

- Public routes must be registered in `src/routers/index.tsx`.
- Tutor dashboard routes must be added to `tutorPath` in `src/routers/tutor.routes.tsx`.
- `tutorPath` is also used for sidebar navigation metadata.
- Use `routesGenerator(tutorPath)` for `/tutor/*`; keep route config and sidebar metadata together.
- Parent tutor routes with children get an index redirect to their first addressable child through `routesGenerator`.
- `PrivateRoute` redirects unauthenticated users to `/login`.
- Do not add pages without wiring their routes.

Current top-level route groups:

- `RootLayout`
- public `MainLayout`
- auth routes (`/login`, `/signup`)
- private `/tutor` under `DashboardLayout`
- `*` fallback to `NotFound`

---

## State & Auth

Store:

- `src/redux/store.ts`

Root feature wiring:

- `src/redux/features/rootFeatures.ts`

Persisted state:

- `auth` only

Auth state:

- `user`
- `accessToken`
- `refreshToken`

Auth slice:

- `src/redux/features/auth/authSlice.ts`

Auth endpoints:

- `POST /auth/teacher/login`
- `POST /auth/teacher/registration`

Base API:

- `src/redux/api/httpSlice.ts`
- `src/redux/api/baseQuery.ts`

API behavior:

- uses `baseUrl.BASE_URL`
- sends `credentials: "include"`
- adds `Authorization: Bearer <accessToken>` when present
- on `401`, posts refresh token to `baseUrl.AUTH_REFRESH_URL`
- refresh request body uses backend field `refresh_token`
- refresh success dispatches `loggedInUser`
- refresh failure dispatches `loggedOutUser`

Safety:

- Keep backend field names as-is.
- Preserve Redux auth as real state, not mock data.
- If auth changes, check `PrivateRoute`, headers, profile dropdown, login, signup, and RTK Query base query behavior.

---

## API Slices

All RTK Query feature APIs are injected into `authApiSlice`.

Current feature APIs:

- `src/redux/features/auth/authApi.ts`
- `src/redux/features/lead/leadApi.ts`
- `src/redux/features/teachers/teachersProfileApi.ts`
- `src/redux/features/tuition-jobs/tuitionJobsApi.ts`

Current backend areas:

- auth
- leads
- public teachers
- own teacher profile
- tuition jobs

Rules:

- Prefer RTK Query for server data.
- Keep response unwrapping/type guards close to the API slice when response shapes vary.
- Reuse existing `isRecord` and related utilities instead of ad hoc unsafe casts.
- Use tag invalidation when mutating cached resources.

---

## Environment

Config:

- `src/config/index.ts`

The active environment is currently hardcoded to development:

- `activeEnv = version.development`

Env keys are read through Vite `import.meta.env`:

- `VITE_APP_LOCAL_API_URL`
- `VITE_APP_LOCAL_AUTH_REFRESH_URL`
- `VITE_APP_LIVE_API_URL`
- `VITE_APP_LIVE_AUTH_REFRESH_URL`
- `VITE_APP_TEST_API_URL`
- `VITE_APP_TEST_AUTH_REFRESH_URL`

Do not silently change the active environment behavior.

---

## Architecture

Preferred layer direction:

- `pages` compose routes and page-specific sections
- `components/layout` owns shells, headers, footers, auth layouts, forms, stats, page-specific layout blocks
- `components/common` owns reusable app-level blocks
- `components/ui` owns primitives
- `redux` owns store, slices, and API wiring
- `hooks`, `utils`, `types`, `config`, `constants`, `mocks`, `validations` support app code

Rules:

- `ui` must not import from `layout` or `pages`.
- `redux` must not import from UI/components.
- Pages may compose layout/common/ui.
- Keep changes minimal and consistent with nearby code.
- Avoid large refactors unless explicitly requested.

---

## Folder Map

Important folders:

- `src/pages`
- `src/pages/home`
- `src/pages/tuition-jobs`
- `src/pages/tutor-hub`
- `src/pages/tutor`
- `src/components/layout`
- `src/components/common`
- `src/components/ui`
- `src/redux`
- `src/routers`
- `src/context`
- `src/hooks`
- `src/utils`
- `src/types`
- `src/config`
- `src/constants`
- `src/mocks`
- `src/validations`
- `src/icons`

There is no active `src/others` folder in the current tree. If one appears, do not use it as an app source location without explicit direction.

---

## Styling

Styling stack:

- Tailwind CSS v4
- Ant Design 6
- project theme tokens in `src/index.css`
- AntD theme bridge in `src/config/theme.ts` and `ThemedConfigProvider`

Fonts:

- Poppins
- Manrope

Theme:

- `ThemeContext` in `src/context/ThemeContext.tsx`
- theme persistence via localStorage/theme store
- dark mode token overrides in `src/index.css`

Use existing tokens/classes:

- `brand-*`
- `surface*`
- `text-*`
- `border`
- semantic success/warning/error colors
- existing shadows and menu classes

Avoid:

- hardcoded one-off colors when a token exists
- bypassing the theme context
- mixing unrelated visual systems in one component

---

## Imports

Use the configured alias:

- `@/...`

Avoid deep relative imports like:

- `../../../...`

SVG icons are exported through `src/icons/index.ts`; prefer existing icons before adding new ones.

---

## Conventions

- PascalCase components
- `useX` hook names
- functional components
- route pages under `src/pages`
- reusable primitives under `src/components/ui`
- app-level reusable components under `src/components/common`
- page shells/sections under `src/components/layout` or local page component folders
- keep TypeScript types in `src/types` or close to a feature when highly local
- preserve backend naming in payloads and API response adapters

---

## Feature Flow

For a public page:

1. Create page under `src/pages`.
2. Add page-specific child components nearby or under the right component layer.
3. Register route in `src/routers/index.tsx`.
4. Add API/hooks/types only if needed.
5. Validate with lint and build.

For a tutor dashboard page:

1. Create page under `src/pages/tutor`.
2. Add route and sidebar metadata in `src/routers/tutor.routes.tsx`.
3. Confirm generated route and sidebar behavior.
4. Keep private access under `/tutor` and `PrivateRoute`.
5. Validate with lint and build.

For API work:

1. Add/inject endpoints through `authApiSlice`.
2. Keep transforms and type guards local to the API slice unless broadly reused.
3. Export generated RTK Query hooks.
4. Update affected pages/components.

---

## Runtime State

Current status:

- tuition job pages use RTK Query endpoints, with mock data still present under `src/mocks`
- tutor dashboard includes demo/template-derived sections
- tutor history has placeholder child pages in route config
- `/tutor/settings` and `/tutor/verification` are placeholder route elements
- filters/search may be partial or placeholder depending on page

Do not promote mock data to production behavior unless explicitly requested.

---

## Safety Rules

- Keep edits scoped.
- Preserve auth, route generation, refresh-token flow, and persisted auth state.
- Do not remove dashboard/sidebar route metadata casually.
- Do not add routes without registering them.
- Do not move files across layers as a side effect of small feature work.
- Do not introduce tests/CI assumptions that do not exist in the repo.
- Do not edit generated build output in `dist`.
- Leave unrelated dirty files alone.

---

## Validation

Before handing off code changes, run:

- `npm run lint`
- `npm run build`

There is no test script currently configured.

For frontend UI changes, also run the dev server when practical:

- `npm run dev`

Vite dev server default:

- port `3500`

---

## Principles

- Codebase first.
- Explicit routing.
- Strict layering.
- Reuse existing utilities and patterns.
- Minimal, targeted changes.
- Preserve backend contracts.
