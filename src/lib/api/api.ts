import axios from "axios";

const url = import.meta.env.VITE_URL;

export const getPostsApi = axios.create({
  baseURL: url,
});

getPostsApi.interceptors.response.use(config => {
  // console.log(config);
  return config;
})