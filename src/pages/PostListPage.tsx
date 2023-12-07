import { useState } from "react";
import { usePostsQuery } from "../lib/api/apiQueries";
import { TagType } from "../ types/postTypes";
import { Container, Col } from "react-bootstrap";
import Banner from "../components/banner/Banner";
import Categories from "../components/post/Categories";
import PostCard from "../components/post/PostCard";
import GridItemContainer from "../components/common/GridItemContainer";

import MtContainer from "../components/common/MtContainer";
import MainTitle from '../components/common/MainTitle';
import SubP from '../components/common/SubP';
import Loading from "../components/Loading";

const PostListPage = () => {
  const [title, _] = useState("");
  const [tag, _1] = useState<TagType | null>(null);
  const { data, isLoading } = usePostsQuery(title, tag);

  // const titleHandler = (title: string) => setTitle(title);

  // if(!data) return null;

  return (
    <MtContainer>
      <Banner >
        <MainTitle>hk's Blog</MainTitle>
        <SubP style={{ color: "var(--purple)", marginTop: "2rem" }}>Welcom my page!</SubP>
      </Banner>
      {
        data && (
          <>
            <Categories tags={data.tags}/>
            <Container style={{ height: "100vh" }}>
              <GridItemContainer>
                {
                  data.posts.map(post => (
                    <Col key={post.id}>
                      <PostCard post={post}/>
                    </Col>
                  ))
                }
              </GridItemContainer>
            </Container>
          </>
        )
      }
      {
        isLoading && <Loading />
      }
    </MtContainer>
  )
}

export default PostListPage;