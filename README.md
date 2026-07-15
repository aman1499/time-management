# TaskFlow Timesheets

Frontend assessment implementation for the TenTwenty developer assignment. The app is a small SaaS-style timesheet manager with credentials login, protected dashboard routes, internal API routes, and mock weekly timesheet data.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo login:

- Email: `name@example.com`
- Password: `password123`

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
```

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- NextAuth credentials provider
- TanStack React Query for API caching and mutations
- Vitest + Testing Library for unit and component tests

## Structure

- `src/app/login` contains the login screen.
- `src/app/dashboard` contains the protected dashboard route.
- `src/app/api/auth/[...nextauth]` contains the NextAuth route handler.
- `src/app/api/timesheets` contains internal API routes for listing and creating entries.
- `src/app/api/timesheets/[id]` contains update and delete routes.
- `src/components` contains reusable UI pieces for login, dashboard, filters, table, pagination, modal shell, and form flows.
- `src/lib` contains auth config, API clients, mock timesheet storage, types, view helpers, and validation.

## Assumptions

- The supplied APIs are simulated with in-memory mock data behind internal Next.js API routes.
- Dummy authentication is acceptable for the assignment; session storage is handled by NextAuth JWT cookies.
- The table follows the required columns: Week #, Date, Status, and Actions. Rows open contextually — a "Completed" week opens a read-only detail view, while "Incomplete"/"Missing" weeks open the edit modal. A dedicated "+ Add Entry" button creates a new week.
- The Add/Edit modal edits the persisted fields (week number, week-start date, status, hours, notes) so the Status column stays consistent with what is saved. Project and Type of Work are illustrative selects kept for design parity with the Figma.
- API routes validate every request body and reject malformed JSON with a 400, invalid fields with a 422, and unauthenticated calls with a 401.
- In-memory data resets when the dev server restarts.

## Time Spent

Approximately 4-5 hours estimated for implementation, validation, UI polish, and README.

## Notes

For production, the in-memory mock data should be replaced with a database and the demo credentials should be replaced with a real identity provider or hashed credential store.
