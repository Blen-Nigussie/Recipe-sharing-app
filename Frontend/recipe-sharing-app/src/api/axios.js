// frontend/src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://enbla-recipe-sharing-app-16il.onrender.com/api', 
  withCredentials: true, // if you're using cookies or sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
