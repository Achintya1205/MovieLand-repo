import React from 'react';
import { UI_CONSTANTS } from '../../constants/config';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie">
      {/* Year and Rating overlay - shows on hover */}
      <div className="movie-overlay">
        <div className="movie-info-top">
          <span className="movie-year">{movie.Year}</span>
          {movie.Rating && movie.Rating !== 'N/A' && (
            <span className="movie-rating">
              ⭐ {movie.Rating}
            </span>
          )}
        </div>
      </div>

      {/* Movie Poster */}
      <div className="movie-poster">
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : UI_CONSTANTS.PLACEHOLDER_IMAGE
          }
          alt={movie.Title}
        />
      </div>

      {/* Movie Info - bottom section */}
      <div className="movie-details">
        <span className="movie-type">{movie.Type}</span>
        <h3 className="movie-title">{movie.Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;