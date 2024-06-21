import React, { useEffect, useState } from "react";
import filmService from '../services/films';

const Votos = ({ id }) => {
  const [peli, setPeli] = useState(null);
  const [error, setError] = useState(false); // Estado para manejar el error de película no encontrada

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await filmService.getById(id);
        if (response) {
          setPeli(response);
        } else {
          setError(true); // Establecer error como true si no se encontró la película
        }
      } catch (error) {
        console.error('Error fetching film:', error);
        setError(true); // Establecer error como true en caso de error de red u otro tipo
      }
    };

    fetchFilm();
  }, [id]);

  const handleLike = async () => {
    try {
      const updatedFilm = { ...peli, buena: peli.buena + 1 };
      await filmService.updateFilm(id, updatedFilm);
      setPeli(updatedFilm);
    } catch (error) {
      console.error('Error updating film:', error);
    }
  };
  
  const handleDislike = async () => {
    try {
      const updatedFilm = { ...peli, mala: peli.mala + 1 };
      await filmService.updateFilm(id, updatedFilm);
      setPeli(updatedFilm);
    } catch (error) {
      console.error('Error updating film:', error);
    }
  };

  // Manejo de renderizado condicional
  if (error) {
    return <p>La película no está en tu base de datos.</p>;
  }

  if (!peli) {
    return <p>Cargando...</p>; // Puedes mostrar un mensaje de carga mientras se busca la película
  }

  return (
    <div className="movie-actions">
      <button onClick={handleLike}>
        👍 {peli.buena}
      </button>
      <button onClick={handleDislike}>
        👎 {peli.mala}
      </button>
    </div>
  );
};

export default Votos;


