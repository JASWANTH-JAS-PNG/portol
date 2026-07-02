# Portol

Portol is an employee HR portal — a dashboard-driven web app for attendance, leave, team visibility, payroll summaries, performance tracking, and internal engagement. It's built with React and styled after modern HRMS tools like Keka.

## Features

- **Home dashboard** — quick access cards for inbox tasks, holidays, leave status, remote team members, live clock-in, and a company feed with birthdays/anniversaries
- **Attendance** — daily stats, shift timings, clock-in actions, and a 30-day attendance log
- **My Team** — team calendar, who's off/late/remote today, and peer directory
- **My Finances** — salary breakdown and payslip history
- **Org** — searchable employee directory and an organization tree grouped by department
- **Engage** — company announcements with active/draft filtering
- **Helpdesk** — support ticket tracking with ticket creation
- **Performance** — KRAs, 1:1 meetings, skills profile, and growth plans
- **Profile** — personal info, editable bio fields, skills, education, and experience
- Light/dark theme and configurable accent color, persisted across sessions

## Tech stack

- [Create React App](https://create-react-app.dev/) (react-scripts 5)
- React 19 with [react-router-dom](https://reactrouter.com/) v6 for routing
- [react-icons](https://react-icons.github.io/react-icons/) for iconography
- Plain CSS with a shared design-token stylesheet (`src/index.css`)
- React Context (`src/context/AppContext.jsx`) for theme/accent/auth state

## Getting started

```bash
npm install
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

## Available scripts

- `npm start` — run the dev server with hot reload
- `npm test` — run the test suite
- `npm run build` — create a production build in `build/`

## Project structure

```
src/
├── components/       # Reusable UI: Navbar, Sidebar, Cards, Common primitives
├── context/          # AppContext (theme, accent color, auth state)
├── data/             # Mock data used throughout the app
├── layouts/           # DashboardLayout (navbar + sidebar shell)
├── pages/            # Route-level pages (Dashboard, Attendance, Profile, ...)
├── App.jsx           # Route definitions
└── main.jsx          # App entry point
```

## Notes

All data in the app (employees, tickets, announcements, payslips, etc.) is mock/placeholder data defined under `src/data/` — there is no backend. It's meant as a front-end reference implementation of an HR portal UI.
