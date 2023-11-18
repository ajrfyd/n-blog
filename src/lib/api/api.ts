import axios from "axios";

// const env = import.meta.env.VITE_ENV;
const { VITE_ENV, VITE_DEV_URL, VITE_PROD_URL } = import.meta.env;

const getPostsUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;
const oauthLoginUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;

export const getPostsApi = axios.create({
  baseURL: getPostsUrl,
});

export const oauthApi = axios.create({
  baseURL: oauthLoginUrl,
});

getPostsApi.interceptors.response.use(config => {
  // console.log(config);
  return config;
})