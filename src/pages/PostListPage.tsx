import { useEffect, useState } from "react";
import { useReqPostData } from "../lib/api/apiQueries";
import { useNavigate } from "react-router-dom";
import { ResponseUserType, TagType } from "../types";
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
import CustomButton from '../components/buttons/CustomButton';
import Seo from "../components/helmet/Seo";
import { PenToolIcon } from "lucide-react";

type PostListProps = {
  user: ResponseUserType;
};

const PostListPage = ({ user }: PostListProps) => {
  const [tag, setTag] = useState<TagType | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const { data, isLoading, isError } = useReqPostData(isFetching, tag);

  const navigate = useNavigate();

  useEffect(() => {
    setIsFetching(false);
  }, [tag]);

  // const { data, isLoading } = usePostsQuery(title, tag);
  // const titleHandler = (title: string) => setTitle(title);
  const tagSearchHandler = (tag: TagType) => {
    setIsFetching(true);
    setTag(tag);
  };
  
  return (
    <MtContainer>
      <Seo 
        title="블로그 페이지 입니다." 
        desc="기술 블로그 리스트 입니다." 
        url="https://k-log3943.netlify.app/posts"
      />
      <Banner >
        <MainTitle
          $isShadow
        >hk's Blog</MainTitle>
        <SubP style={{ marginTop: "2rem" }}>Welcome my page!</SubP>
      </Banner>
      {
        data && !isError && (
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
      {
        isError && <NoResults isError={isError}/>
      }
      {
        (user && user.role === "admin") && (
          <div style={{
            position: "fixed",
            right: "2rem", 
            bottom: "2rem",
            zIndex: 10
          }}>
            <CustomButton
              $isIcon
              onClick={() => navigate("/write", { state: user.access_token })}
            >
              <PenToolIcon />
            </CustomButton>
          </div>
        ) 
      }
    </MtContainer>
  )
}

export default PostListPage;