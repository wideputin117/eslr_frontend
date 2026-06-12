# EasySLR Frontend

React + TypeScript frontend for EasySLR, an article review workspace for importing, filtering, and reviewing research articles inside organization projects.

## Submission Details

- GitHub repository: `<add your GitHub repository URL>`
- Deployed frontend URL: Not deployed yet. Local app runs at `http://localhost:5173`.
- Required backend: `http://localhost:3000/api`
- Demo credentials after backend seed:
  - Email: `owner@example.com`
  - Password: `password123`
- Approximate time spent: `8-12 focused hours` across backend, frontend, debugging, and documentation.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Axios
- TanStack Table
- Headless UI
- Tailwind CSS

## Setup

Install dependencies:

```bash
cd frontend
npm install
```

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

The backend must also be running:

```bash
cd ../backend
npm run dev
```

## Useful Scripts

```bash
npm run dev     # start Vite dev server
npm run build   # type-check and build production assets
npm run preview # preview production build locally
npm run test    # run Vitest, once tests are added
```

## Architecture

```text
src/
  api/          Axios API client and auth token handling
  components/   reusable UI components
  context/      Auth context provider
  hooks/        auth hook
  pages/        route-level screens
  routes/       React Router definitions
  types/        shared frontend types
```

Main routes:

- `/login`: login/register entry point
- `/`: organizations list
- `/organizations/:organizationId/projects`: projects in an organization
- `/projects/:projectId`: article review workspace

Core workflow:

1. User logs in and receives a JWT from the backend.
2. The frontend stores the token and attaches it to API requests.
3. User selects an organization and project.
4. Project workspace loads articles with search, status filter, and pagination.
5. User can import articles from Excel, preview validation errors, commit valid rows, and update review status/notes.

## Configuration

The API base URL is currently hard-coded in `src/api/client.ts`:

```ts
const API_BASE_URL = 'http://localhost:3000/api';
```

For deployment, I would move this to a Vite environment variable such as:

```env
VITE_API_URL=https://your-api.example.com/api
```

## Assumptions

- The backend is running locally on port `3000`.
- The frontend is evaluated through the seeded demo account.
- Authorization errors are handled by the backend as the source of truth.
- The assignment focuses on the core end-to-end workflow rather than polished production deployment.

## Tradeoffs

- Auth token storage uses `localStorage` for speed and simplicity. A production app should consider httpOnly cookies or stricter token lifecycle management.
- API state is handled with local component state and direct Axios calls instead of React Query. This keeps the project smaller but means caching and retries are basic.
- Styling uses Tailwind and local components instead of a full design system.
- The API URL is hard-coded for local development.
- Table filtering and pagination are driven by API calls rather than a richer client-side data layer.

## Tests and Verification

No dedicated frontend test files are currently included. I verified the frontend manually by checking:

- Login with seeded credentials
- Protected route behavior
- Organization and project navigation
- Article list loading
- Search and status filtering
- Review status/note update modal
- Excel import preview and commit flow

Build verification:

```bash
npm run build
```

Recommended next tests:

- Auth context tests for login/logout behavior
- API client tests for token header attachment
- Component tests for article table filtering states
- Review modal tests for submit/cancel behavior
- Import modal tests for preview errors and commit success

## AI Usage

AI tools used:

- ChatGPT/Codex for documentation structure, implementation review, and targeted code suggestions.

AI-assisted parts:

- README organization
- Discussion preparation
- Suggestions for explaining frontend/backend boundaries
- Some implementation guidance around React state, API calls, and import/review workflows

Personally verified:

- The route map in `src/routes/index.tsx`.
- The API client methods and local API base URL.
- The frontend package scripts and dependencies.
- The manual app flow using the seeded backend credentials.

Example of changed/rejected AI output:

- AI suggested describing the app as deployed and environment-driven. I corrected this README to say the frontend is local-only right now and that the API URL is currently hard-coded.

## What I Would Improve Next

- Move the API base URL into `VITE_API_URL`.
- Add frontend tests for auth, route protection, article review, and import preview.
- Add stronger loading, empty, and error states across the workspace.
- Add bulk review actions and export.
- Improve accessibility details such as focus handling in modals and keyboard navigation in tables.
