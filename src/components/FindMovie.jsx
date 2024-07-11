import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import filmService from '../services/films'; // Importa el servicio films.js


const FindMovie = () => {
  const API_KEY = '81b5b50832dc7337c0e67602e5310489';
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=`;
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const searchMovies = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(URL + query);
      const result = response.data.results;
      setMovies(result);
      setLoading(false);
    } catch (error) {
      console.error('Error searching movies:', error);
      setLoading(false);
    }
  };

  const handleAddMovie = async (movie) => {
    console.log('movie.id es ,',movie.id)
    const newMovie = {
      idExterna: movie.id.toString(), // Convertir id a string para que coincida con el formato en tu base de datos
      vista: false,
      titulo: movie.title,
      buena: 0,
      mala: 0
    };

    try {
      await filmService.newFilm(newMovie);
      alert(`${movie.title} ha sido agregada a tu base de datos.`);
      navigate('/')
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error agregando la película a la base de datos.');
    }
  };

  return (
    <div>
      <h1>Buscar Películas</h1>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas por título..."
        />
        <button type="submit">Buscar</button>
      </form>
      {loading && <p>Cargando...</p>}
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            <button onClick={() => handleAddMovie(movie)}>Agregar a mi base de datos</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindMovie;



