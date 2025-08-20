// frontend/src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', 
  withCredentials: true, // if you're using cookies or sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
