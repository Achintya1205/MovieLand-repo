import { API_CONFIG } from '../constants/config';

/**
 * Search movies by title with TMDB API
 */
export const searchMovies = async (title, options = {}) => {
  const { type, year, page = 1 } = options;
  
  try {
    let endpoint = '';
    
    if (type === 'tv') {
      endpoint = '/search/tv';
    } else if (type === 'movie') {
      endpoint = '/search/movie';
    } else {
      endpoint = '/search/multi';
    }
    
    const params = new URLSearchParams({
      api_key: API_CONFIG.API_KEY,
      query: title,
      page: page,
    });
    
    if (year) {
      params.append('year', year);
    }
    
    const url = `${API_CONFIG.BASE_URL}${endpoint}?${params.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform TMDB data to match our component structure WITH RATINGS
    const transformedResults = data.results.map(item => ({
      imdbID: item.id.toString(),
      Title: item.title || item.name,
      Year: item.release_date?.substring(0, 4) || item.first_air_date?.substring(0, 4) || 'N/A',
      Type: item.media_type || type || 'movie',
      Poster: item.poster_path ? `${API_CONFIG.IMAGE_BASE_URL}${item.poster_path}` : 'N/A',
      Rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A', // ADD RATING HERE
      VoteCount: item.vote_count || 0,
    }));
    
    return {
      Search: transformedResults,
      totalResults: data.total_results.toString(),
      Response: 'True',
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get detailed movie information by ID
 */
export const getMovieDetails = async (movieId, mediaType = 'movie') => {
  try {
    const endpoint = mediaType === 'tv' ? '/tv' : '/movie';
    const url = `${API_CONFIG.BASE_URL}${endpoint}/${movieId}?api_key=${API_CONFIG.API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      imdbRating: data.vote_average ? data.vote_average.toFixed(1) : 'N/A',
      Plot: data.overview || 'No description available',
      Released: data.release_date || data.first_air_date || 'N/A',
      Runtime: data.runtime ? `${data.runtime} min` : 'N/A',
      Genre: data.genres?.map(g => g.name).join(', ') || 'N/A',
      Tagline: data.tagline || '',
      Status: data.status || 'N/A',
      Budget: data.budget || 0,
      Revenue: data.revenue || 0,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Fetch detailed information for multiple movies (if needed)
 */
export const fetchMoviesWithDetails = async (movies) => {
  try {
    const detailsPromises = movies.map(async (movie) => {
      try {
        const details = await getMovieDetails(movie.imdbID, movie.Type);
        return {
          ...movie,
          Rating: details.imdbRating,
          Plot: details.Plot,
          Released: details.Released,
          Runtime: details.Runtime,
          Genre: details.Genre,
        };
      } catch (error) {
        return {
          ...movie,
          Rating: movie.Rating || 'N/A',
          Plot: 'No description available',
        };
      }
    });
    
    return await Promise.all(detailsPromises);
  } catch (error) {
    console.error('Error fetching movies with details:', error);
    throw error;
  }
};