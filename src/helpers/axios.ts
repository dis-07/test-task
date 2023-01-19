import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.spaceflightnewsapi.net/v3',
});

export default instance;
