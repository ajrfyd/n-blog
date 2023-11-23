import { useQuery } from "@tanstack/react-query";
import { getPostsData } from "./api";
import { toBeSavedPostsType } from "../../stroe/posts";
import { Tag } from "../../pages/PostsMain";

// export const usePostsQuery = (savePostsFn: (T: toBeSavedPostsType) => typeof T) => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["posts"],
//     queryFn: getPostsData,
//     retry: 2,
//     // select: afterFn
//     select: savePostsFn
//     // refetchOnWindowFocus: true,
//     // suspense: true,
//   });

//   return { data, isLoading, error };
// };


export const usePostsQuery = (title: string = "", tag: Tag | null) => {
  // const reqFn = (title === "" && tag) ? () => getPostsByTag(tag.value) : getPostsData;

  const { data, isLoading, error } = useQuery<toBeSavedPostsType>({
    queryKey: ["posts"],
    queryFn: getPostsData,
    retry: 2,
    // select: afterFn
    select: (data) => {
      if(title !== "" && tag === null) return { tags: data.tags, posts: data.posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase())) };
      if(title === "" && tag && tag.label !== "all") {
        const posts = data.posts.filter(post => post.tags.some(pTag => pTag.id === tag.value))
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
