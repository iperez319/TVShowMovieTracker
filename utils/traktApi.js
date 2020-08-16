import axios from 'axios';

const tracktAPI = axios.create({
  baseURL: 'https://api.trakt.tv',
  headers: {
    'Content-Type': 'application/json',
    'trakt-api-key':
      'f833323f1943cae7ea08a81d2ed0d965af599a90376bea4da318a4b4497e13d2',
    'trakt-api-version': '2',
  },
});

export const getTrakt = (url, params) => tracktAPI.get(url, {params});
export const postTrakt = (url, data) => tracktAPI.post(url, data);

export default tracktAPI;
