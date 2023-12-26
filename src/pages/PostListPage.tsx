import { useEffect, useState } from "react";
import { useReqPostData } from "../lib/api/apiQueries";
import { TagType } from "../ types/postTypes";
import { Container, Col } from "react-bootstrap";
import Banner from "../components/banner/Banner";
import Categories from "../components/post/Categories";
import PostCard from "../components/post/PostCard";
import GridItemContainer from "../components/common/GridItemContainer";
import MtContainer from "../components/common/MtContainer";
import MainTitle from '../components/common/MainTitle';
import SubP from '../components/common/SubP';
import Loading from "../components/page/Loading";
import NoResults from "../components/page/NoResults";

const PostListPage = () => {
  const [tag, setTag] = useState<TagType | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const { data, isLoading  } = useReqPostData(isFetching, tag);
  
  useEffect(() => {
    setIsFetching(false);
  }, [tag]);

  // const { data, isLoading } = usePostsQuery(title, tag);
  // const titleHandler = (title: string) => setTitle(title);
  const tagSearchHandler = (tag: TagType) => {
    setIsFetching(true);
    setTag(tag);
  };

  console.log(`%c${isFetching}`, "color: red");

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
            <Categories tags={data.result.tags} tagSearchHandler={tagSearchHandler}/>  
            <Container style={{ height: "100vh" }}>
              <GridItemContainer>
                {
                  data.result.posts.length >= 1 ? data.result.posts.map(post => (
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