// MoviesList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import filmService from '../services/films';
import './MoviesList.css'; // Importa el archivo CSS

const MoviesList = () => {
  const [pelis, setPelis] = useState([]);
  const [filtro, setFiltro] = useState('Todas'); // Estado para controlar el filtro

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await filmService.getAll();
        setPelis(response);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    fetchFilms();
  }, [pelis]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta película?");
    if (!confirmDelete) return;

    try {
      await filmService.deleteFilm(id);
      setPelis(pelis.filter(peli => peli.id !== id));
    } catch (error) {
      console.error('Error deleting film:', error);
    }
  };

  const handleToggleVista = async (id, vista) => {
    try {
      const updatedFilm = await filmService.updateFilm(id, { ...pelis.find(peli => peli.id === id), vista: !vista });
      setPelis(pelis.map(peli => (peli.id === id ? updatedFilm : peli)));
    } catch (error) {
      console.error('Error updating film:', error);
    }
  };

  // Función para filtrar películas según el estado 'filtro'
  const filtrarPeliculas = () => {
    let peliculasFiltradas = [];
  
    switch (filtro) {
      case 'Todas':
        peliculasFiltradas = [...pelis];
        break;
      case 'Vistas':
        peliculasFiltradas = pelis.filter(peli => peli.vista);
        break;
      case 'No-Vistas':
        peliculasFiltradas = pelis.filter(peli => !peli.vista);
        break;
      default:
        peliculasFiltradas = [...pelis];
        break;
    }
  
    // Ordenar las películas por título (orden alfabético)
    peliculasFiltradas.sort((a, b) => (a.titulo < b.titulo ? -1 : 1));
  
    return peliculasFiltradas;
  };

  // Función para manejar el cambio de filtro
  const handleFiltroChange = (filtroSeleccionado) => {
    setFiltro(filtroSeleccionado);
  };

  return (
    <div>
      <h1>Videoteca de Javi</h1>
      <div className="filter-buttons">
        <button onClick={() => handleFiltroChange('Todas')}>Todas</button>
        <button onClick={() => handleFiltroChange('Vistas')}>Vistas</button>
        <button onClick={() => handleFiltroChange('No-Vistas')}>No-Vistas</button>
      </div>
      <ul>
        {filtrarPeliculas().map(peli => (
          <li key={peli._id} className="movie-item">
            <div className="movie-info">
              <Link to={`/movie/${peli.idExterna}`}>{peli.titulo}</Link>
            </div>
            <div className="movie-actions">
              <button onClick={() => handleToggleVista(peli._id, peli.vista)}>
                {peli.vista ? 'Vista' : 'No vista'}
              </button>
              <button onClick={() => handleDelete(peli._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;








