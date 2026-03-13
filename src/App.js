import { useEffect, useState } from 'react';
import Header from './components/Layout/Header';
import SearchBar from './components/SearchBar/SearchBar';
import MovieCard from './components/MovieCard/MovieCard';
import { searchMovies } from './utils/api';
import { SEARCH_CONFIG, UI_CONSTANTS } from './constants/config';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (title = searchTerm) => {
    if (!title.trim()) {
      setError(UI_CONSTANTS.ERROR_MESSAGES.EMPTY_SEARCH);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(title);
      setMovies(data.Search || []);
    } catch (err) {
      setError(err.message || UI_CONSTANTS.ERROR_MESSAGES.API_ERROR);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(SEARCH_CONFIG.DEFAULT_QUERY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Header />
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={() => handleSearch()}
      />

      {loading && (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      )}

      {error && !loading && (
        <div className="error">
          <h2>{error}</h2>
        </div>
      )}

      {!loading && !error && movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        !loading && !error && (
          <div className="empty">
            <h2>{UI_CONSTANTS.ERROR_MESSAGES.NO_RESULTS}</h2>
          </div>
        )
      )}
    </div>
  );
};

export default App;