import axios from "axios";

const env = import.meta.env.VITE_ENV;
const url = env === "development" ? import.meta.env.VITE_DEV_URL :import.meta.env.VITE_URL;

export const getPostsApi = axios.create({
  baseURL: url,
});

getPostsApi.interceptors.response.use(config => {
  // console.log(config);
  return config;
})