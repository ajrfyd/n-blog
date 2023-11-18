import { useEffect, useState } from "react";
import ContentContainer from "../components/ContentContainer";
import SearchLayout from '../layouts/SearchLayout';
import GridLayout from "../layouts/GridLayout";
import GridItem from "../components/GridItem";
import PostCard from "../components/PostCard";
import { getPostsApi } from "../lib/api/api";
import { Tags } from "../ types/postTypes";
import { setPostsData } from "../stroe/posts";
import { useDispatch } from "react-redux";

export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: Tags[];
  createdAt: Date;
}

const PostsMain = () => {
  const [posts, setPosts] = useState<PostType[] | []>([]);
  // const [tags, seTags] = useState<Tags[] | []>([]);
  // let posts;
  const dispatch = useDispatch();
  // Todo - react-query 변경
  // Todo - posts & tags 같이 가져와
  const getPosts = async() => {
    const { data }  = await getPostsApi({ method: "get", url: "posts" });
    setPosts(data.posts);
    dispatch(setPostsData({ posts: data.posts, tags: data.tags }));
    // posts = dispatch(getPostsData());
  };

  // posts = useSelector((state: RootReducerType) => state.posts.posts);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ContentContainer>
      <SearchLayout 
        $hasMargin
      />
      <GridLayout>
        {
          posts.map(post => <GridItem key={post.id} $bgColor="white"><PostCard {...post}/></GridItem>)
        }
      </GridLayout>
    </ContentContainer>
  )
}

export default PostsMain;
