import axios from './helpers/axios';

export const getPosts = async () => {
  const responce = await axios.get('/articles?_limit=6');

  return responce.data;
};

export const getPostsId = async (id: number) => {
  const responce = await axios.get(`/articles/${id}`);
  return responce;
};
