import React, { useEffect, useState } from 'react';
import filmService from '../services/films';

const TopMovies = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        // Obtener todas las películas desde la base de datos
        const allMovies = await filmService.getAll();

        // Ordenar las películas por la propiedad 'buena' en orden descendente
        const sortedMovies = allMovies.sort((a, b) => b.buena - a.buena);

        // Limitar a las diez primeras películas
        const topTenMovies = sortedMovies.slice(0, 10);

        // Actualizar el estado con las películas mejor valoradas
        setTopMovies(topTenMovies);
      } catch (error) {
        console.error('Error fetching top movies:', error);
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <div>
      <h2>Top 10 Películas Mejor Valoradas</h2>
      <ul>
        {topMovies.map(movie => (
          <li key={movie.idExterna}>
            <strong>{movie.titulo}</strong> - Buena: {movie.buena}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopMovies;
