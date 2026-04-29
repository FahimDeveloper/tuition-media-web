# AGENTS.md

## Project

Tuition Media (TutoriumBD) client app

Flows:

- /, /tuition (public)
- /login, /signup (auth)
- /dashboard/\* (private)

Includes: marketplace UI, auth, tuition (mock), dashboard (demo)  
Excludes: CRM, internal tools

---

## Source of Truth

1. codebase
2. this file

---

## Entry & Routing

- entry: src/main.tsx
- router: src/routers/index.tsx

Startup:
Redux → AntD → Persist → Router

Routes:

- /, /tuition, /login, /signup, /dashboard, \*

⚠️ must manually register routes

---

## State & Auth

store: src/redux/store.ts  
persist: auth only

auth:

- user, accessToken, refreshToken

behavior:

- auto Bearer token
- credentials: include
- 401 → refresh
- success → loggedInUser
- fail → loggedOutUser

endpoints:

- POST /auth/teacher/login
- POST /auth/teacher/registration

⚠️ keep backend field names as-is

---

## Architecture

layers:
pages → layout → common → ui

rules:

- ui !→ layout/pages
- redux !→ ui

roles:

- pages: routes
- layout: sections/shells
- common: reusable blocks
- ui: primitives

---

## Structure

src/

- pages/
- components/{layout,common,ui}
- redux/
- routers/
- hooks/utils/types/config/mocks

🚫 ignore /others

---

## Runtime State

- tuition = mock data
- filters/search = placeholder
- dashboard = demo
- env = hardcoded (DEV)
- no tests/CI

preserve:

- Redux auth (not mock)
- ProfileDropdown uses persisted user
- /dashboard/settings not wired

---

## Styling

Tailwind + AntD

use tokens:

- brand-\*
- surface
- text-\*

no hardcoded colors

fonts:

- Manrope
- Poppins

dark mode:

- ThemeContext + localStorage

---

## Imports

use: @/...
avoid: ../../../

---

## Conventions

- PascalCase components
- useX hooks
- functional components
- follow existing style
- no large refactors

---

## Routing Rules

- update routers/index.tsx always
- PrivateRoute → /login if no auth

---

## Feature Flow

1. create page (pages/)
2. register route
3. compose layout
4. place components:
   - layout = page-specific
   - common = reusable
   - ui = primitive
5. connect Redux if needed

---

## Safety Rules

- keep edits minimal
- preserve auth + routing + refresh

if auth touched:
→ check Header, ProfileDropdown, PrivateRoute

🚫 do not:

- use /others
- promote mock data
- add routes without wiring

---

## Validation

npm run lint
npm run build

(no tests)

---

## Principles

- strict layering
- explicit routing
- reuse patterns
- minimal changes
