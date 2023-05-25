import axios from 'axios';
import config from '.';

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
});

export default axiosInstance;
