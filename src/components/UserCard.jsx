// UserCard.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/users';
import './UserCard.css'; // Importamos el archivo CSS para estilizar el componente


const UserCard = () => {
  const { id: userId } = useParams();  // Obtener el parámetro id de la URL
  const [user, setUser] = useState(null);
  const [isInDatabase, setIsInDatabase] = useState(true); // Estado para controlar si el usuario está en la base de datos

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getById(userId); // Utilizar userId en lugar de id
        const fetchedUser = response;
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setIsInDatabase(false); // Marcar como no está en la base de datos si hay un error
      }
    };

    fetchUser();
  }, [userId]); // Usar userId como dependencia del efecto

  // Si no está en la base de datos, mostrar un mensaje o realizar alguna acción
  if (!isInDatabase) {
    return <p>El usuario no está en la base de datos.</p>;
  }

  // Si user es null, muestra un mensaje de carga o realiza alguna acción
  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  // Destructuramos las propiedades del usuario
  const { name, username, email, online, image } = user;



  // Determinamos el color del disco según el estado 'online'
  const statusIndicatorClass = online ? 'status-indicator-online' : 'status-indicator-offline';

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={image} alt={name} className="avatar-img" />
        <div className={`status-indicator ${statusIndicatorClass}`}></div>
      </div>
      <div className="user-info">
        <h2>{name}</h2>
        <p>@{username}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default UserCard;

