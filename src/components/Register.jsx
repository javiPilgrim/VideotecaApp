import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/users';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        name: name,
        username: username,
        password: password,
        email: email,
        online: false // Online por defecto es false al registrarse
      };
      const response = await userService.newUser(newUser);
      console.log('Usuario registrado:', response);
      // Redirigir al componente LoginForm
      navigate('/');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Manejo de errores, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="register-form">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;

