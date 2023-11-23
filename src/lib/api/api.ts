import axios from "axios";
// InternalAxiosRequestConfig
import { StateType } from "../../stroe/posts";

// const env = import.meta.env.VITE_ENV;
const { VITE_ENV, VITE_DEV_URL, VITE_PROD_URL } = import.meta.env;

const getPostsUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;
const oauthLoginUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;

export const getPostsApi = axios.create({
  method: "get",
  baseURL: getPostsUrl,
});

export const oauthApi = axios.create({
  baseURL: oauthLoginUrl,
});

getPostsApi.interceptors.response.use((config) => {
  // console.log(config);
  return config;
});

export const getPostsData = async<T = StateType>(): Promise<T> => {
  const { data } = await getPostsApi<T>("posts");
  return data;
};

export const getPostsByTag = async<T = StateType>(id: string): Promise<T> => {
  const { data } = await getPostByTagApi(id);
  console.log(data);
  return data;
};

const getPostByTagApi = (id: string) => {
  const postByTag = axios.create({
    baseURL: getPostsUrl + `posts/tag/${id}`
  });
  postByTag.interceptors.response.use(
  );

  return postByTag.get("/");
};

export const getPostByIdApi = (id: string) => {
  const postById = axios.create({
    baseURL: getPostsUrl + `posts/${id}`,
  });

  postById.interceptors.request.use(
    (a) => (a),
  );

  postById.interceptors.response.use(
    (a) => (console.log(a), a)
  );

  return postById.get("/");
}

// const getOauthAxios = (token: string) => {
//   const oautAxios = axios.create({
//     baseURL: "",
//     headers: {
//       Authorization: token,
//     }
//   });
//   // onFulfilled  / onRejected
//   oautAxios.interceptors.response.use(
//     res => res,
//     err => {
//       if(err.response.status === 401) {

//         err.config.headers.Authorization = accessToken;
//         return (await axios.get(url, config)).data;
//       }
//     }
//     )
// };