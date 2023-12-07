import { useParams } from "react-router-dom";
import { usePostQuery } from "../../lib/api/apiQueries";
import Banner from "../banner/Banner";
import MtContainer from "../common/MtContainer";
import MainTitle from '../common/MainTitle';
import MDEditor from "@uiw/react-md-editor";
import { Container } from "react-bootstrap";


const PostDetail = () => {
  const { id } = useParams();
  const { data: post } = usePostQuery(id as string, true);
  
  return (
    <MtContainer>
      <Banner>
        <MainTitle>Welcome!</MainTitle>
      </Banner>
      {
        post && (
          <Container>
            <MDEditor.Markdown 
            source={post.body} 
            style={{ 
              whiteSpace: 'pre-wrap', 
              minHeight: "300px", 
              borderRadius: "5px", 
              padding: "4rem 1rem",
              background: "var(--white)",
              color: "var(--purple)"
            }}
          />
          </Container>
        )
      }
    </MtContainer>
  )
}

export default PostDetail;