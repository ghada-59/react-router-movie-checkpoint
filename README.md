# React Router Movie Checkpoint

A Vite + React project demonstrating the React Router checkpoint:

1. Each movie object includes `description` and `trailerURL`.
2. Selecting a movie card navigates to `/movie/:movieId`.
3. The details page displays the description and embedded trailer and includes a **Back to home** action powered by `useNavigate()`.

It also keeps the previous movie-app interactions: title search, minimum-rating filtering, adding a movie, and React Hooks (`useState`, `useEffect`, `useRef`, `useMemo`, plus custom hooks). Added movies are stored in `localStorage`.

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Important files

- `src/data/movies.js` — movie objects, including description and trailer embed link.
- `src/main.jsx` — wraps the app in `BrowserRouter`.
- `src/App.jsx` — declares routes with `Routes` and `Route`, and uses `Link` for internal navigation while keeping the movie collection in state.
- `src/components/MovieCard.jsx` — makes each card navigate to its matching details route using `Link`.
- `src/pages/MovieDetails.jsx` — reads `movieId` with `useParams`, uses `useNavigate()` for the Back to home button, and displays the details/trailer.
- `src/pages/Home.jsx` — home page with movie grid, search, rating filter and add-movie form.

## Adding a movie

Use the **Add a movie** form. The trailer field accepts a YouTube embed link such as `https://www.youtube.com/embed/VIDEO_ID`. Common YouTube `watch?v=...` and `youtu.be/...` links are also converted to embed links on the details page.

## If you're integrating into your existing checkpoint

Keep your existing movie objects and components; add `description` and `trailerURL` to each object, wrap your app in `BrowserRouter`, declare routes with `Routes` and `Route`, wrap each clickable card in a `Link`, and use `useParams()` plus `useNavigate()` on the details page.
