import axios from 'axios';

const url = "/api/users";

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const getById = async (id) => {
    const response = await axios.get(`${url}/${id}`);
    return response.data
}

const newUser = async (user) => {
  const response = await axios.post(url, user);
  console.log('se añadio esto', user)
  return response.data;
};

const updateUser = async (id, updatedUser) => {
  const response = await axios.put(`${url}/${id}`, updatedUser);
  return response.data;
};

const deleteFilm = async (id) => {
  const response = await axios.delete(`${url}/${id}`)
  return response
}

export default { getAll, newUser, updateUser, getById, deleteFilm };