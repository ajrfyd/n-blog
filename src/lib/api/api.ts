import axios from "axios";
// InternalAxiosRequestConfig
import { StateType } from "../../stroe/posts";
import { PostType } from "../../ types/postTypes";

// const env = import.meta.env.VITE_ENV;
const { VITE_ENV, VITE_DEV_URL, VITE_PROD_URL } = import.meta.env;

const getPostsUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;
const getTagsUrl = VITE_ENV === "development" ? VITE_DEV_URL + "tags" : VITE_PROD_URL + "tags";
const oauthLoginUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;
const baseUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;

// type ResponseType<T> = AxiosResponse<T> & {
//   data: T;
// };

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
  return data;
};

const getPostByTagApi = async(id: string) => {
  const postByTag = await axios.create({
    baseURL: getPostsUrl + `posts/tag/${id}`
  });
  postByTag.interceptors.response.use(
  );

  return postByTag.get("/");
};

type ResponseType<T> = {
  status: number;
  message: string;
  post: T;
};

export const getPostByIdApi = async (id: string): Promise<ResponseType<PostType>> => {
  const postById = await axios.create({
    baseURL: getPostsUrl + `posts/${id}`,
  });

  postById.interceptors.response.use(
    ({ data }) => (data)
  );

  return postById.get("/");
};

export const getTagsApi = async() => {
  const getTags = await axios.create({
    baseURL: getTagsUrl
  });

  return getTags.get("/");
};

export const updatePost = axios.create({
  baseURL: baseUrl + "posts"
});





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