import { useEffect, useState } from "react";
import ContentContainer from "../components/ContentContainer";
import SearchSection from '../layouts/SearchSection';
import GridLayout from "../layouts/GridLayout";
import GridItem from "../components/GridItem";
import Post from "../components/Post";
import { getPostsApi } from "../lib/api/api";


export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: Date;
}

const BlogMain = () => {
  const [posts, setPosts] = useState<PostType[] | []>([]);

  const getPosts = async() => {
    const { data }  = await getPostsApi({ method: "get", url: "posts" });
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ContentContainer>
      <SearchSection $hasMargin/>
      <GridLayout>
        {
          posts.map(post => <GridItem key={post.id} $bgColor="white"><Post {...post}/></GridItem>)
        }
      </GridLayout>
    </ContentContainer>
  )
}

export default BlogMain;
