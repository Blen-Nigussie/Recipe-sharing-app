// frontend/src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://recipe-sharing-app-fj75.onrender.com/api', 
  withCredentials: true, // if you're using cookies or sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
