import { useState } from "react";
import { usePostsQuery } from "../lib/api/apiQueries";
import { TagType } from "../ types/postTypes";
import { Container, Col } from "react-bootstrap";
import Banner from "../components/banner/Banner";
import CustomCategories from "../components/post/CustomCategories";
import PostCard from "../components/post/PostCard";
import GridItemContainer from "../components/common/GridItemContainer";

import MtContainer from "../components/common/MtContainer";
import MainTitle from '../components/common/MainTitle';
import SubP from '../components/common/SubP';
import Loading from "../components/Loading";
import NoResults from "../components/page/NoResults";

const PostListPage = () => {
  const [title, _] = useState("");
  const [tag, setTag] = useState<TagType | null>(null);
  const { data, isLoading } = usePostsQuery(title, tag);

  // const titleHandler = (title: string) => setTitle(title);
  const tagSearchHandler = (tag: TagType) => setTag(tag);
  // if(!data) return null;

  return (
    <MtContainer>
      <Banner >
        <MainTitle
          $isShadow
        >hk's Blog</MainTitle>
        <SubP style={{ marginTop: "2rem" }}>Welcom my page!</SubP>
      </Banner>
      {
        data && (
          <>
            <CustomCategories tags={data.tags} tagSearchHandler={tagSearchHandler}/>  
            <Container style={{ height: "100vh" }}>
              <GridItemContainer>
                {
                  data.posts.length >= 1 ? data.posts.map(post => (
                    <Col key={post.id}>
                      <PostCard post={post}/>
                    </Col>
                  )) : <NoResults />
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