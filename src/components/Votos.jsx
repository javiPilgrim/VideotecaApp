import React, { useEffect, useState } from "react";
import filmService from '../services/films';

const Votos = ({ id }) => {
  const [peli, setPeli] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await filmService.getAll();
        const fetchPeli = response.find(p => p.idExterna === id.toString());
        if (fetchPeli) {
          setPeli(fetchPeli);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching film:', error);
        setError(true);
      }
    };

    fetchFilm();
  }, [id]);

  const handleLike = async () => {
    try {
      const updatedFilm = { ...peli, buena: peli.buena + 1 };
      await filmService.updateFilm(peli._id, updatedFilm);
      setPeli(updatedFilm); // Actualizando el estado después de la respuesta de la API
    } catch (error) {
      console.error('Error updating film:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const updatedFilm = { ...peli, mala: peli.mala + 1 };
      await filmService.updateFilm(peli._id, updatedFilm);
      setPeli(updatedFilm); // Actualizando el estado después de la respuesta de la API
    } catch (error) {
      console.error('Error updating film:', error);
    }
  };

  if (error) {
    return <p>La película no está en tu base de datos.</p>;
  }

  if (!peli) {
    return <p>Cargando...</p>;
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
