import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card" aria-label={`View ${movie.title} details`}>
      <div className="poster-wrap">
        <img className="movie-poster" src={movie.posterURL} alt={`${movie.title} poster`} loading="lazy" />
        <span className="rating-pill">★ {Number(movie.rating).toFixed(1)}</span>
        <span className="view-overlay">View details <span aria-hidden="true">↗</span></span>
      </div>
      <div className="movie-card-copy">
        <div className="movie-meta"><span>{movie.year || 'New release'}</span><span>{movie.genre || 'Movie'}</span></div>
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
      </div>
    </Link>
  );
}
