import axios from 'axios';
import { API_URL } from 'scripts/constants';

export const axiosApi = axios.create({
  baseURL: API_URL
});
