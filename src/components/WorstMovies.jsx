import React, { useEffect, useState } from 'react';
import filmService from '../services/films';

const WorstMovies = () => {
  const [worstMovies, setWorstMovies] = useState([]);

  useEffect(() => {
    const fetchWorstMovies = async () => {
      try {
        // Obtener todas las películas desde la base de datos
        const allMovies = await filmService.getAll();

        // Ordenar las películas por la propiedad 'mala' en orden descendente
        const sortedMovies = allMovies.sort((a, b) => b.mala - a.mala);

        // Limitar a las diez primeras películas
        const worstTenMovies = sortedMovies.slice(0, 10);

        // Actualizar el estado con las películas peor valoradas
        setWorstMovies(worstTenMovies);
      } catch (error) {
        console.error('Error fetching worst movies:', error);
      }
    };

    fetchWorstMovies();
  }, []);

  return (
    <div>
      <h2>Top 10 Películas Peor Valoradas</h2>
      <ul>
        {worstMovies.map(movie => (
          <li key={movie.idExterna}>
            <strong>{movie.titulo}</strong> - Mala: {movie.mala}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorstMovies;
