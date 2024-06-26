import axios from "axios";
// InternalAxiosRequestConfig
import { StateType } from "../../stroe/posts";
import {
  PostType,
  PostListType,
  ServerDefaultResponseType,
  NewPostType,
} from "../../types";
const { VITE_ENV, VITE_DEV_URL, VITE_PROD_URL, VITE_KLOG_URL } = import.meta
  .env;

const getPostsUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;
const getTagsUrl =
  VITE_ENV === "development" ? VITE_DEV_URL + "tags" : VITE_PROD_URL + "tags";
const oauthLoginUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;
const baseUrl = VITE_ENV === "development" ? VITE_DEV_URL : VITE_PROD_URL;

const klogInstance = axios.create({
  baseURL: VITE_ENV === "development" ? VITE_DEV_URL : VITE_KLOG_URL,
  headers: {
    "Content-Type": "Application/json",
  },
});

export const getPosts = async <T = PostListType>(): Promise<T> => {
  const { data } = await klogInstance.get("/klog/post");
  return data;
};

//* use
const reqKlogApi = axios.create({
  baseURL: VITE_ENV === "development" ? VITE_DEV_URL : VITE_KLOG_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//* use
export const reqPostData = async <T = PostListType>(
  id: string | null
): Promise<T> => {
  const { data } = await reqKlogApi.get<T>(
    `/klog/post${id ? `/tag/${id}` : ""}`
  );
  // try {
  // const { data } = await testApi.get<T>(`/klog/post${id ? `/tag/${id}` : ""}`);

  //   return data;

  // } catch(e) {
  //   throw(e);
  // }
  return data;
};

//* use
export const reqPostById = async <T>(id: string) => {
  const { data } = await reqKlogApi.get<ServerDefaultResponseType<T>>(
    `/klog/post/${id}`,
    { withCredentials: true }
  );
  // const { data } = await testApi.get<ServerDefaultResponseType<T>>(`/klog/post/${id}`);

  return data;
};

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

export const getPostsData = async <T = StateType>(): Promise<T> => {
  const { data } = await getPostsApi<T>("posts");
  return data;
};

export const getPostsByTag = async <T = StateType>(id: string): Promise<T> => {
  const { data } = await getPostByTagApi(id);
  return data;
};

const getPostByTagApi = async (id: string) => {
  const postByTag = await axios.create({
    baseURL: getPostsUrl + `posts/tag/${id}`,
  });
  // postByTag.interceptors.response.use(
  // );

  return postByTag.get("/");
};

type ResponseType<T> = {
  status: number;
  message: string;
  post: T;
};

export const getPostByIdApi = async (
  id: string
): Promise<ResponseType<PostType>> => {
  const postById = await axios.create({
    baseURL: getPostsUrl + `posts/${id}`,
  });

  postById.interceptors.response.use(({ data }) => data);

  return postById.get("/");
};

export const getTagsApi = async () => {
  const getTags = await axios.create({
    baseURL: getTagsUrl,
  });

  // getTags.interceptors.response.use(({ data }) => (console.log(data), data));

  return getTags.get("/");
};

export const updatePost = axios.create({
  baseURL: baseUrl + "posts",
});

// const reqGithubOauthApi = axios.create({
//   baseURL: `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GH_ID}`
// });

export const reqTagsData = async <T>(): Promise<T> => {
  const { data } = await reqKlogApi.get("/klog/tags");

  return data;
};

// const testApi = axios.create({
//   baseURL: 'https://api.hkound.pe.kr',
//   // baseURL: 'http://localhost:8800',
//   headers: {
//     'Content-Type': "application/json"
//   }
// });

export const createPost = async <T>(post: NewPostType) => {
  const { data } = await reqKlogApi.post<ServerDefaultResponseType<T>>(
    "/klog/post/create",
    { data: post }
  );
  // const { data } = await testApi.post<ServerDefaultResponseType<T>>("/klog/post/create", { data: post });

  return data;
};

export const editPost = async <T>(
  post: Omit<PostType, "createdAt">,
  token: string
) => {
  const { data } = await reqKlogApi.post<ServerDefaultResponseType<T>>(
    "/klog/post/edit",
    post,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // const { data } = await testApi.post<ServerDefaultResponseType<T>>("/klog/post/edit", post, {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });

  return data;
};

export const reqOauth = async <T>(code: string) => {
  const { data } = await reqKlogApi.post<ServerDefaultResponseType<T>>(
    "/klog/oauth",
    { code },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  // const { data } = await testApi.post<ServerDefaultResponseType<T>>("/klog/oauth", { code }, {
  //   headers: {
  //     Accept: "application/json"
  //   }
  // });
  return data;
};

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
