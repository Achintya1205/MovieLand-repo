// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  API_KEY: process.env.REACT_APP_TMDB_API_KEY,
};

// Search Configuration
export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 500,
  DEFAULT_QUERY: 'Batman',
  RESULTS_PER_PAGE: 20,
};

// Filter Options
export const FILTER_OPTIONS = {
  TYPES: [
    { value: 'all', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'tv', label: 'TV Series' },
  ],
};

// UI Constants
export const UI_CONSTANTS = {
  PLACEHOLDER_IMAGE: 'https://via.placeholder.com/400x600?text=No+Image+Available',
  ERROR_MESSAGES: {
    NO_RESULTS: 'No movies found. Try a different search term.',
    API_ERROR: 'Failed to fetch movies. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    EMPTY_SEARCH: 'Please enter a search term.',
  },
};