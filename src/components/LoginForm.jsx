// LoginForm.jsx
import React, { useState } from 'react';
import userService from '../services/users';
import { useNavigate } from 'react-router-dom';
//import './loginForm.css';




const LoginForm = ({ handleLogin, nav }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await userService.getAll();
      const user = users.find(u => u.name === name && u.password === password);
      if (user) {
        // Actualizar estado de usuario como online
        await userService.updateUser(user._id, { ...user, online: true });
        // Llamar a función de padre para manejar el inicio de sesión
        handleLogin(user);
        // Redirigir a la página principal o a donde sea necesario
        navigate('/');
      } else {
        setError('Nombre de usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Redirigir al formulario de registro
  };

  return (
    <div className="login-form">
      <div className="titulo">
      <h2>Iniciar Sesión</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            placeholder='Nombre del usuario'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="loginButton" type="submit">Iniciar Sesión</button>
      </form>
      <button className="loginButton" onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default LoginForm;

