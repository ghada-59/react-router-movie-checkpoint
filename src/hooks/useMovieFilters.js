import { useMemo, useState } from 'react';

// Keeps filter state and filtering logic reusable and separate from the page UI.
export default function useMovieFilters(movies) {
  const [titleFilter, setTitleFilter] = useState('');
  const [minimumRating, setMinimumRating] = useState('0');

  const filteredMovies = useMemo(() => {
    const query = titleFilter.trim().toLowerCase();
    return movies.filter((movie) => {
      const matchesTitle = movie.title.toLowerCase().includes(query);
      const matchesRating = movie.rating >= Number(minimumRating);
      return matchesTitle && matchesRating;
    });
  }, [movies, titleFilter, minimumRating]);

  return {
    titleFilter,
    setTitleFilter,
    minimumRating,
    setMinimumRating,
    filteredMovies,
  };
}
