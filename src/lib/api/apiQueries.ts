import { useQuery } from "@tanstack/react-query";
import { getPostsData, getTagsApi, getPostByIdApi } from "./api";
import { toBeSavedPostsType } from "../../stroe/posts";
import { Tag } from "../../pages/PostsMain";
import { ServerTagType } from "../../ types/postTypes";

// export const usePostQuery = (postId: string, isRender: boolean) => {

//   return useQuery<AxiosResponse<PostType>, AxiosError, PostType, string[]>({
//     queryKey: ["postById", postId],
//     queryFn: ({ queryKey }) => getPostByIdApi(queryKey[1]),
//     select: (data) => (console.log(data.data.post), data.data),
//     notifyOnChangeProps: ['data'],
//     enabled: isRender
//   });

//   // return { data, isLoading, error };
// };

export const usePostQuery = (postId: string, isRender: boolean) => {
  return useQuery({
    queryKey: ["postById", postId],
    queryFn: ({ queryKey }) => getPostByIdApi(queryKey[1]),
    select: ({ post }) =>  (post),
    // notifyOnChangeProps: ['data'],
    enabled: isRender
  });
};


export const usePostsQuery = (title: string = "", tag: Tag | null) => {
  // const reqFn = (title === "" && tag) ? () => getPostsByTag(tag.value) : getPostsData;

  const { data, isLoading, error } = useQuery<toBeSavedPostsType>({
    queryKey: ["posts"],
    queryFn: getPostsData,
    retry: 2,
    // select: afterFn
    select: (data) => {
      if(title !== "" && tag === null) return { tags: data.tags, posts: data.posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase())) };
      if(title === "" && tag && tag.label !== "All") {
        const posts = data.posts.filter(post => post.tags.some(pTag => pTag.id === tag.value));
        return { posts, tags: data.tags };
      };
      return data;
    },
    // enabled: req,
    // refetchOnWindowFocus: true,
    // suspense: true,
  });

  return { data, isLoading, error };
};

export const useAllTagsQuery = (isModify: boolean) => {
  const { data } = useQuery({
    queryKey: ["tags"],
    queryFn: getTagsApi,
    select: ({ data }: { data: ServerTagType[] }) => data,
    enabled: isModify
  });

  return data;
};