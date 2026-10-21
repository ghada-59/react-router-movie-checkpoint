import { useMemo } from 'react';
import AddMovieForm from '../components/AddMovieForm.jsx';
import Filter from '../components/Filter.jsx';
import MovieList from '../components/MovieList.jsx';
import useMovieFilters from '../hooks/useMovieFilters.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Home({ movies, onAddMovie }) {
  useDocumentTitle('Discover films');
  const { titleFilter, setTitleFilter, minimumRating, setMinimumRating, filteredMovies } = useMovieFilters(movies);
  const averageRating = useMemo(() => {
    if (movies.length === 0) return '—';
    return (movies.reduce((total, movie) => total + Number(movie.rating), 0) / movies.length).toFixed(1);
  }, [movies]);

  return (
    <main>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT GREAT WATCH</p>
          <h1>Stories worth<br /><em>staying in for.</em></h1>
          <p className="hero-description">A little collection of unforgettable films. Discover a story, explore the details, and press play on the trailer.</p>
          <a className="hero-link" href="#collection">Explore the collection <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-side-note"><span>FRAME / 001</span><span>CURATED FOR CINEMA LOVERS</span></div>
      </section>

      <section className="collection section-shell" id="collection">
        <div className="section-heading">
          <div><p className="eyebrow">THE LIBRARY</p><h2>Find your <em>next favorite.</em></h2></div>
          <div className="collection-stats"><div><strong>{movies.length.toString().padStart(2, '0')}</strong><span>FILMS</span></div><div><strong>{averageRating}</strong><span>AVG. RATING</span></div></div>
        </div>

        <AddMovieForm onAddMovie={onAddMovie} />
        <Filter titleFilter={titleFilter} setTitleFilter={setTitleFilter} minimumRating={minimumRating} setMinimumRating={setMinimumRating} />
        <div className="results-line"><span>SHOWING {filteredMovies.length} {filteredMovies.length === 1 ? 'FILM' : 'FILMS'}</span><span>SELECT A FILM TO EXPLORE ↗</span></div>
        <MovieList movies={filteredMovies} />
      </section>
    </main>
  );
}
