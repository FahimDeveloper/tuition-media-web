# Repository Guidelines

## Purpose

This repository is the public client application for Tuition Media. It covers public marketplace flows such as:

- home and marketing pages
- teacher login/signup entry points
- tuition browsing and related public-facing discovery flows

Out of scope here:

- internal CRM and backoffice tools
- tele-sales or internal operations dashboards
- private internal workflows

## Source of Truth

- `AGENTS.md`: compact Codex operating guide for implementation decisions
- `PROJECT_GUIDE.md`: full onboarding and architecture reference for developers

Use `PROJECT_GUIDE.md` for broader context. Use this file for day-to-day execution rules and UI consistency.

## Current Project State

Work against the real app state, not the intended future state.

- Active app startup comes from `src/main.tsx` and `src/routers/index.tsx`.
- `src/App.tsx` exists but is not the active routing composition entry.
- `Login`, `Signup`, and `Tuition` are still placeholder screens.
- `Dashboard` and `Profile` page files exist but are not routed.
- Header auth behavior is currently mocked with a hardcoded logged-in state.
- `ProfileDropdown` uses mock user data.
- `others/` contains scratch/reference files and is not part of the runtime source structure.
- `src/config/index.ts` currently hardcodes the live environment selection.

Do not copy placeholder logic or mock data patterns into production-oriented work unless the task is explicitly scaffolding.

## Project Structure

This project uses a layered frontend structure. Extend the current structure instead of introducing a feature-first model.

- `src/pages/`: route-level screens
- `src/components/`: reusable UI, split into `layout`, `common`, and `ui`
- `src/redux/`: store setup, auth state, and API helpers
- `src/routers/`: route configuration
- `src/hooks/`, `src/config/`, `src/types/`, `src/utils/`: shared app logic
- `public/` and `src/assets/`: static assets

## Layered Component Placement

Use this placement order for all new UI work:

1. Route/screen composition -> `src/pages/*`
2. App shell and section composition -> `src/components/layout/*`
3. Cross-page composed blocks -> `src/components/common/*`
4. Low-level reusable primitives -> `src/components/ui/*`

Current layout conventions:

- `src/components/layout/shared/*`: shell components such as `MainLayout`, `Header`, `Footer`, `ProfileDropdown`
- `src/components/layout/home/*`: home page sections
- `src/components/layout/home/featuredTeacher/*`: multi-file section module

Home section rule:

- keep simple sections as single files
- create a folder only when local complexity grows through child components, styles, constants, hooks, types, or tests

Dependency direction:

- `pages` can import from `layout`, `common`, `ui`, hooks, utils, types, redux
- `layout` can import from `common`, `ui`, hooks, utils, types
- `common` can import from `ui`, hooks, utils, types
- `ui` must not import from `layout` or `pages`
- `redux` must not import UI components

## Development Commands

- `npm run dev`: start Vite locally
- `npm run build`: run TypeScript build and production bundle
- `npm run preview`: preview the production build
- `npm run lint`: run ESLint

## Coding Conventions

- Use TypeScript with React functional components.
- Keep components, pages, and layouts in PascalCase.
- Use `useX` naming for custom hooks.
- Keep shared barrels as `index.ts` where that pattern already exists.
- Follow nearby code style before introducing a new local pattern.
- Keep documentation updated when changing architecture, setup, or environment configuration.

## Communication

When answering the user:

- be concise and practical by default
- summarize what changed and why in a few lines
- mention validation performed or clearly say when tests were not run
- avoid long explanations unless the user asks for depth

## UI Style Guide

Follow the existing design direction already established in `Header`, `Footer`, `Hero`, `BecomeTutor`, and the featured teacher section.

### Visual Direction

- Clean, trustworthy, editorial SaaS feel
- Blue-led brand palette with soft light surfaces
- Rounded, polished UI with subtle depth
- Bold display typography for headings, restrained supporting copy

Do not introduce a different visual language unless the task explicitly requires it.

### Colors and Tokens

- Use Tailwind theme tokens from `src/index.css`
- Prefer `brand-50` to `brand-900`, `surface`, `surface-subtle`, `text-strong`, and `text-on-brand`
- Prefer semantic classes such as `bg-surface`, `text-text-strong`, `bg-brand-600`
- Use existing aliases like `text-neutral` only when matching nearby code
- Avoid new hardcoded hex colors when an existing token already fits

### Typography

- Base font: `Manrope`
- Display, section headings, and brand-led labels: `font-poppins`
- Headings should usually be bold or extrabold
- Supporting copy should stay readable with moderate line-height
- Eyebrow labels should be small, uppercase, and slightly tracked

### Layout and Spacing

- Prefer `max-w-7xl px-4 sm:px-6 lg:px-8` for major section containers
- Use mobile-first layouts
- Favor consistent spacing rhythms over arbitrary values
- Keep section padding generous and content blocks well separated

### Shape, Border, and Depth

- Prefer `rounded-lg`, `rounded-xl`, and `rounded-2xl`
- Use `rounded-full` for avatars, pills, and circular icon treatments
- Keep borders in the `brand-100/200/300` family
- Use soft shadows and light elevation, not heavy dramatic effects
- Blur and elevated dropdown/card treatments are acceptable when subtle

### Buttons, Links, and Interactive Elements

- Primary actions: filled brand button
- Secondary actions: bordered or tinted brand treatment
- Navigation and dropdown items should use soft hover backgrounds and stronger brand text on hover
- Always keep `focus-visible` rings visible, typically with `ring-brand-400`
- Keep transitions moderate: usually `duration-200` or `duration-300`

### Sections and Content Patterns

- Prefer section intros with:
  - a small eyebrow label
  - a bold heading
  - a short supporting paragraph
- Use chips, badges, and small metric pills for supporting metadata
- Dark brand sections should be used sparingly for emphasis, like the current `BecomeTutor` section
- Cards should feel clean and elevated, with token-based borders and backgrounds

### Motion

- Use meaningful motion only
- Hover lift, carousel controls, marquee motion, and subtle menu transitions are acceptable
- Respect reduced-motion behavior when animation is added
- Do not add motion that makes the page feel noisy

### Accessibility

- Prefer semantic HTML elements
- Add `aria-label` for icon-only controls
- Preserve keyboard focus visibility
- Keep contrast strong enough across light and dark brand sections

### Do Not Propagate Current Inconsistencies

- Do not treat mocked auth logic as the real auth pattern
- Do not copy scratch-file experiments from `others/` into production code
- Do not spread ad hoc placeholder routes like `/dashboard` or `/profile` without wiring them properly
- Do not copy obvious implementation artifacts forward when touching existing UI

## Frontend Checklist

Before finalizing frontend work, verify:

- correct folder placement
- consistent use of project tokens and typography
- visible focus styles on interactive elements
- responsive behavior across `sm`, `md`, and `lg`
- `npm run lint` and `npm run build` for code changes
- relevant docs updated if structure or config changed

## Anti-Patterns

- Do not create a new architecture model inside this repo.
- Do not place every new component in `layout` by default.
- Do not create folder-per-component for simple sections.
- Do not hardcode off-theme colors when project tokens exist.
- Do not remove focus-visible styles from interactive controls.
- Do not overfit new UI to placeholder data or temporary mocked behavior.

## Security and Configuration

- Never commit secrets or credentials.
- Do not expose private or internal-only data in public UI flows.
- Document new environment variables in project docs.
