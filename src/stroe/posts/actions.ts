import { toBeSavedPostsType } from ".";
const GET_DATA = "posts_GET_DATA" as const;
const SET_DATA = "posts_SET_DATA" as const;

export const getPostsData = () => ({ type: GET_DATA });
export const setPostsData = (data: toBeSavedPostsType) => ({ type: SET_DATA, payload: data });
// export const setPostsData = (data: toBeSavedPostsType) => {
//   return ({ type: SET_DATA, payload: data });
// }
