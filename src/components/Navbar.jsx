import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Películas</Link>
        </li>
        <li>
          <Link to="/find-movie">Buscar en Imbd</Link>
        </li>
        <li>
          <Link to="/users">Usuarios</Link>
        </li>
        <li>
          <Link to="/topMovies">Mejor Valoradas</Link>
        </li>
        <li>
          <Link to="/worstMovies">Peor Valoradas</Link>
        </li>
        <li>
          <Link to="/popularMovies">Las + de Imbd</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;