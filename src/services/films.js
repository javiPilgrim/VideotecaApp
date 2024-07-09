import axios from 'axios';

const url = "http://localhost:3001/api/films";

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const getById = async (id) => {
    const response = await axios.get(`${url}/${id}`);
    return response.data
}

const newFilm = async (film) => {
  const response = await axios.post(url, film);
  return response.data;
};

const updateFilm = async (id, updatedFilm) => {
  const response = await axios.put(`${url}/${id}`, updatedFilm);
  return response.data;
};

const deleteFilm = async (id) => {
  const response = await axios.delete(`${url}/${id}`)
  console.log('Se ha borrado')
  return response
}

export default { getAll, newFilm, updateFilm, getById, deleteFilm };