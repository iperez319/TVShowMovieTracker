import axios from 'axios';

const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const getTmdb = (url, params) =>
  tmdbAPI.get(url, {
    params: {api_key: 'cdbe4fd0e38a206f5dd681b2d580f810', ...params},
  });
export const postTmdb = (url, data) =>
  tmdbAPI.post(url, data, {
    params: {api_key: 'cdbe4fd0e38a206f5dd681b2d580f810'},
  });
export const baseImageUrl = 'https://image.tmdb.org/t/p/';

export default tmdbAPI;
