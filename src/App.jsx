import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MoviesList from './components/MoviesList';
import MovieView from './components/MovieView';
import FindMovie from './components/FindMovie';
import UserList from './components/UserList';
import Register from './components/Register';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import TopMovies from './components/TopMovies';
import WorstMovies from './components/WorstMovies';
import UserCard from './components/UserCard';
import PopularMovies from './components/PopularMovies';
import userService from './services/users';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('loggedUser', JSON.stringify(user)); // Guardar usuario en localStorage
  };

  const handleLogout = async () => {
    if (currentUser) {
      await userService.updateUser(currentUser._id, { ...currentUser, online: false });
      setCurrentUser(null);
      localStorage.removeItem('loggedUser'); // Limpiar usuario de localStorage
    }
  };

  return (
    <Router>
      <div className="App">
        {currentUser && (
          <div className="header-content">
            {currentUser.name} is Logged in
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {currentUser && (
          <div>
            <Navbar />
          </div>
        )}
        <div>
          <Routes>
            {currentUser ? (
              <>
                <Route exact path="/" element={<MoviesList />} />
                <Route exact path="/movie/:id" element={<MovieView />} />
                <Route exact path="/find-movie" element={<FindMovie />} />
                <Route exact path="/users" element={<UserList />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<LoginForm handleLogin={handleLogin} />} />
                <Route exact path='/topMovies' element={<TopMovies />} />
                <Route exact path='/worstMovies' element={<WorstMovies />} />
                <Route exact path='/users/:id' element={<UserCard />} />
                <Route exact path='/popularMovies' element={<PopularMovies />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route exact path="/" element={<LoginForm handleLogin={handleLogin} />} />
                <Route exact path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
