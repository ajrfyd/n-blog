import { Tags, PostType } from "../../ types/postTypes";
import { getPostsData, setPostsData } from "./actions";

export type toBeSavedPostsType = {
  posts: PostType[];
  tags: Tags[];
};

export type StateType = toBeSavedPostsType & {};

export type ActionType = 
  | ReturnType <typeof getPostsData>
  | ReturnType <typeof setPostsData>
  ;

