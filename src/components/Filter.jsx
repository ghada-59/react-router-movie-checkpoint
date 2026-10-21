export default function Filter({ titleFilter, setTitleFilter, minimumRating, setMinimumRating }) {
  return (
    <div className="filters" aria-label="Filter movies">
      <label className="search-control">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <span className="sr-only">Search by movie title</span>
        <input
          type="search"
          placeholder="Search a movie..."
          value={titleFilter}
          onChange={(event) => setTitleFilter(event.target.value)}
        />
      </label>
      <label className="rating-control">
        <span>Minimum rating</span>
        <select value={minimumRating} onChange={(event) => setMinimumRating(event.target.value)}>
          <option value="0">All ratings</option>
          <option value="6">6.0+</option>
          <option value="7">7.0+</option>
          <option value="8">8.0+</option>
          <option value="9">9.0+</option>
        </select>
      </label>
    </div>
  );
}
