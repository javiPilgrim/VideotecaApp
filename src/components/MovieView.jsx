import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import filmService from '../services/films';
import Votos from './Votos';
import './MovieView.css'; // Importa el archivo CSS

const MovieView = () => {
  const { id: movieId } = useParams();  // Obtener el parámetro id de la URL
  const [film, setFilm] = useState(null);
  const [credits, setCredits] = useState(null);
  const [ageRating, setAgeRating] = useState(null);
  const [isInDatabase, setIsInDatabase] = useState(false); // Estado para controlar si la película está en la base de datos interna
  const API_KEY = '81b5b50832dc7337c0e67602e5310489';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`);
        const fetchedFilm = response.data;
        setFilm(fetchedFilm);
        
        // Verificar si la película está en la base de datos interna
        const allFilms = await filmService.getAll(); // Suponiendo que getAll() devuelve un array de películas en la base de datos interna
        const isInDB = allFilms.some(dbFilm => Number(dbFilm.id) === fetchedFilm.id);
        setIsInDatabase(isInDB);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsInDatabase(false); // Marcar como no está en la base de datos si hay un error
      }
    };

    fetchMovieDetails();
  }, [movieId, API_KEY]);

  useEffect(() => {
    const fetchCredits = async () => {
      if (!film) return;
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${API_KEY}&language=es-ES`);
        setCredits(response.data);
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    fetchCredits();
  }, [film, API_KEY]);

  useEffect(() => {
    const fetchAgeRating = async () => {
      if (!film) return;
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${film.id}/release_dates?api_key=${API_KEY}`);
        const releaseDates = response.data.results;
        const spainRelease = releaseDates.find(country => country.iso_3166_1 === 'ES');
        const spainCertification = spainRelease?.release_dates[0]?.certification || 'No disponible';
        setAgeRating(spainCertification);
      } catch (error) {
        console.error('Error fetching age rating:', error);
      }
    };

    fetchAgeRating();
  }, [film, API_KEY]);


  if (!film) return <p>Cargando...</p>;

  // Verificar si film.genres es un array antes de mapearlo
  const genreList = Array.isArray(film.genres) ? film.genres.map(genre => genre.name).join(', ') : 'No disponible';

  // Obtener el nombre del director (si está disponible)
  const director = credits ? credits.crew.find(member => member.job === 'Director') : null;
  const directorName = director ? director.name : 'No disponible';

  // Obtener los nombres de los actores principales (hasta 5)
  const actors = credits ? credits.cast.slice(0, 5).map(actor => actor.name).join(', ') : 'No disponible';

  // Construir la URL completa de la imagen del póster (tamaño más pequeño)
  const posterUrl = film.poster_path ? `https://image.tmdb.org/t/p/w92${film.poster_path}` : null;

  // Obtener el año de creación
  const releaseYear = film.release_date ? new Date(film.release_date).getFullYear() : 'No disponible';

  // Renderizar Votos solo si la película está en la base de datos interna
  return (
    <div className="movie-view">
      {posterUrl && <img src={posterUrl} alt={film.title} className="movie-poster" />}
      <div className="movie-details">
        <h2>Título: {film.title}</h2>
        <h3>Subtítulo: {film.tagline}</h3>
        <p>Géneros: {genreList}</p>
        <p>Director: {directorName}</p>
        <p>Actores: {actors}</p>
        <p>Sinopsis: {film.overview}</p>
        <p>Año de creación: {releaseYear}</p>
        <p>Edad recomendada: {ageRating}</p>
      </div>
      {isInDatabase && <Votos id={film.id} />}
    </div>
  );
};

export default MovieView;








