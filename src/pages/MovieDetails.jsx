import { Link, useParams } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

function getEmbedURL(url = '') {
  // Accept an embed URL as requested by the checkpoint, and also convert common YouTube links.
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (parsed.hostname.endsWith('youtube.com') && parsed.pathname === '/watch') {
      const videoId = parsed.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    return url;
  } catch {
    return url;
  }
}

export default function MovieDetails({ movies }) {
  const { movieId } = useParams();
  const movie = movies.find((item) => String(item.id) === movieId);
  useDocumentTitle(movie ? movie.title : 'Movie not found');

  if (!movie) {
    return (
      <main className="not-found section-shell">
        <p className="eyebrow">404 / NOT IN THIS COLLECTION</p>
        <h1>This film is <em>off the reel.</em></h1>
        <p>We couldn't find that movie. Head back to the collection and choose another one.</p>
        <Link className="primary-button" to="/">← Back to home</Link>
      </main>
    );
  }

  const trailerURL = getEmbedURL(movie.trailerURL);

  return (
    <main className="details-page">
      <div className="details-topbar section-shell">
        <Link className="back-link" to="/"><span aria-hidden="true">←</span> Back to home</Link>
        <span className="details-index">FRAME / FILM {String(movie.id).padStart(3, '0')}</span>
      </div>

      <section className="details-hero section-shell">
        <div className="details-poster-frame">
          <img src={movie.posterURL} alt={`${movie.title} poster`} className="details-poster" />
        </div>
        <div className="details-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> FILM DETAILS</p>
          <h1>{movie.title.split(':')[0]}{movie.title.includes(':') && <><br /><em>{movie.title.substring(movie.title.indexOf(':') + 1).trim()}</em></>}</h1>
          <div className="details-meta"><span className="detail-rating">★ {Number(movie.rating).toFixed(1)} <small>/ 10</small></span><span>{movie.year || 'Release year n/a'}</span><span>{movie.genre || 'Feature film'}</span></div>
          <div className="copy-rule" />
          <p className="description-label">THE STORY</p>
          <p className="movie-description">{movie.description}</p>
          <a className="primary-button trailer-jump" href="#trailer">Watch the trailer <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="trailer-section section-shell" id="trailer">
        <div className="section-heading trailer-heading">
          <div><p className="eyebrow">TAKE A LOOK</p><h2>Inside the <em>story.</em></h2></div>
          <span className="trailer-tag">OFFICIAL TRAILER</span>
        </div>
        {trailerURL ? (
          <div className="trailer-frame">
            <iframe
              src={trailerURL}
              title={`${movie.title} trailer`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="missing-trailer">A trailer has not been added for this movie yet.</p>
        )}
        <div className="bottom-back"><span>END OF FEATURE</span><Link className="back-link" to="/">← Return to all films</Link></div>
      </section>
    </main>
  );
}
