import { useRef, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  posterURL: '',
  rating: '7.0',
  trailerURL: '',
  year: new Date().getFullYear().toString(),
  genre: 'Drama',
};

export default function AddMovieForm({ onAddMovie }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const titleInputRef = useRef(null);

  function openForm() {
    setIsOpen((isCurrentlyOpen) => !isCurrentlyOpen);
    if (!isOpen) {
      // useRef gives direct access to the title input so we can focus it.
      window.setTimeout(() => titleInputRef.current?.focus(), 0);
    }
  }

  function handleChange(event) {
    setForm((previousForm) => ({ ...previousForm, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevents the browser from refreshing the page.
    const newMovie = {
      ...form,
      id: Date.now(),
      rating: Number(form.rating),
      year: Number(form.year) || new Date().getFullYear(),
      posterURL: form.posterURL.trim() || 'https://placehold.co/500x750/171722/ffffff?text=Movie+Poster',
      trailerURL: form.trailerURL.trim(),
    };
    onAddMovie(newMovie);
    setForm(emptyForm);
    setIsOpen(false);
  }

  return (
    <section className="add-section">
      <button className="add-toggle" type="button" onClick={openForm} aria-expanded={isOpen}>
        <span>{isOpen ? '−' : '+'}</span> {isOpen ? 'Close form' : 'Add a movie'}
      </button>
      {isOpen && (
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <div><p className="eyebrow">YOUR COLLECTION</p><h3>Add a new film</h3></div>
            <p>Fields marked * are required.</p>
          </div>
          <div className="form-grid">
            <label>Movie title *
              <input ref={titleInputRef} name="title" value={form.title} onChange={handleChange} required maxLength={100} placeholder="e.g. The Matrix" />
            </label>
            <label>Rating (0–10) *
              <input name="rating" type="number" min="0" max="10" step="0.1" value={form.rating} onChange={handleChange} required />
            </label>
            <label>Poster image URL
              <input name="posterURL" type="url" value={form.posterURL} onChange={handleChange} placeholder="https://..." />
            </label>
            <label>Trailer embed URL *
              <input name="trailerURL" type="url" value={form.trailerURL} onChange={handleChange} required placeholder="https://www.youtube.com/embed/VIDEO_ID" />
            </label>
            <label>Release year
              <input name="year" type="number" min="1888" max="2100" value={form.year} onChange={handleChange} />
            </label>
            <label>Genre
              <input name="genre" value={form.genre} onChange={handleChange} placeholder="e.g. Sci-Fi · Action" />
            </label>
            <label className="full-width">Description *
              <textarea name="description" value={form.description} onChange={handleChange} required rows="3" maxLength={800} placeholder="What is this movie about?" />
            </label>
          </div>
          <button className="primary-button" type="submit">Save movie <span aria-hidden="true">↗</span></button>
        </form>
      )}
    </section>
  );
}
