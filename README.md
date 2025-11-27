# Project Documentation

This repository contains the user interface for the "Egypt Landmarks" website built with Next.js (App Router) and TypeScript.

## Quick Summary
- Framework: Next.js (App Router)
- Language: TypeScript
- Icons: react-icons
- Styling: CSS Modules + globals.css
- App entry: `client/app/`

> Note: The project you are working on is located inside the `client/` folder in this repo.

## Running the Project Locally (PowerShell)
```powershell
cd e:\masget\client
npm install
npm run dev
# Open http://localhost:3000
```

## Useful Commands
- Build for production: `npm run build`
- Run production version locally: `npm start`
- TypeScript check: `npx tsc --noEmit -p .`
- ESLint check: `npm run lint`

## Important Folder Structure
- `client/app/` — App Router pages
- `client/components/` — Reusable components
- `client/public/assets/images/` — Images and assets
- `client/styles/` — CSS Modules files

## Notable Pages and Components
- `app/register/page.tsx` — Registration form page
- `app/courses/` — Course detail pages (`course1`, `course2`, `course3`, `shariah-studies`)
- `components/Navbar.tsx` — Navbar with mobile support and active link
- `components/Footer.tsx` — Footer with course links and contact
- `components/ScrollToTop.tsx` — Scroll to top button
- `components/StudentTestimonials.tsx` — Student testimonials (uses react-icons)

## Deployment to Vercel
1. Push changes to GitHub.
2. In Vercel Dashboard select Import Project.
3. Set Root Directory to `client` (important if the repo contains multiple projects).
4. Ensure to set environment variables in Settings if needed.

## Tips and Solutions for Common Issues
- ENOSPC / EPERM: Check disk space and folder permissions, delete `node_modules` then `npm install` if needed.
- dev server locked: Close any Node process running on port 3000 or delete `.next/dev/lock` then run `npm run dev`.
- External images with `next/image`: Add `remotePatterns` in `next.config.js` or place images in `public/assets/images`.

## How to Contribute
1. Start a new branch for the feature/fix.
2. Run tests/lint checks locally.
3. Open a Pull Request to `main` with a description of the changes.