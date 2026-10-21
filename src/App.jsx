import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import { initialMovies } from './data/movies.js';

const STORAGE_KEY = 'frame-movie-checkpoint-v1';

function readSavedMovies() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialMovies;
  } catch {
    return initialMovies;
  }
}

export default function App() {
  const [movies, setMovies] = useState(readSavedMovies);

  // Save the collection so movies added by the user remain after refresh.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    } catch {
      // The app still works if local storage is unavailable.
    }
  }, [movies]);

  function handleAddMovie(newMovie) {
    setMovies((currentMovies) => [newMovie, ...currentMovies]);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Frame home"><span className="brand-mark">F<span>.</span></span><span className="brand-name">FRAME</span></Link>
        <span className="header-note">A PERSONAL FILM JOURNAL</span>
        <Link className="header-link" to="/#collection">THE COLLECTION <span aria-hidden="true">↗</span></Link>
      </header>
      <Routes>
        <Route path="/" element={<Home movies={movies} onAddMovie={handleAddMovie} />} />
        <Route path="/movie/:movieId" element={<MovieDetails movies={movies} />} />
        <Route path="*" element={<main className="not-found section-shell"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>Wrong <em>screen.</em></h1><p>This page doesn't exist in our collection.</p><Link className="primary-button" to="/">← Back to home</Link></main>} />
      </Routes>
      <footer className="site-footer"><span>FRAME © {new Date().getFullYear()}</span><span>MADE FOR THE LOVE OF FILM</span><Link to="/#collection">BACK TO COLLECTION ↑</Link></footer>
    </div>
  );
}
