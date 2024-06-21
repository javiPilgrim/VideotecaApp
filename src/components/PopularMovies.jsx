import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '81b5b50832dc7337c0e67602e5310489';
const POPULAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(POPULAR_MOVIES_URL);
        const popularMovies = response.data.results.slice(0, 10); // Obtener solo las 10 primeras películas
        setMovies(popularMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1>Las películas más populares de IMDb</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Puntuación: {movie.vote_average}</p>
              <p>Fecha de lanzamiento: {movie.release_date}</p>
              <p>{movie.overview}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ maxWidth: '200px' }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularMovies;
