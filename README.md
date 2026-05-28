# Bonobo Gym

React website for Bonobo Gym on Kvarnholmen. The app uses Create React App, Tailwind CSS, React Router, and i18next for English and Swedish content.

## Getting Started

Install dependencies:

```sh
npm install
```

Start the local Vite development server:

```sh
npm start
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

## Scripts

- `npm start` runs the local Vite development server.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm test` runs the Vitest suite once.

## Project Structure

- `src/pages/` contains the top-level routes.
- `src/components/` contains reusable page sections and layout components.
- `public/locales/en/translation.json` and `public/locales/sv/translation.json` contain localized site copy.
- `src/assets/images/` contains gym photos and videos used by the site.

## Notes

The app is a client-rendered React SPA. Keep route URLs stable because static hosting should serve `index.html` for deep links.
