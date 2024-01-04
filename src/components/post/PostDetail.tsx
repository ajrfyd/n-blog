import { useParams, useNavigate } from "react-router-dom";
import { useReqPostDataById } from "../../lib/api/apiQueries";
import Banner from "../banner/Banner";
import MtContainer from "../common/MtContainer";
import MainTitle from '../common/MainTitle';
import MDEditor from "@uiw/react-md-editor";
import { Container } from "react-bootstrap";
import Iconbutton from '../buttons/IconButton';
import { Undo2Icon, FileEditIcon } from "lucide-react";
import { ResponseUserType } from "../../types";

type PostDetailProps = {
  user: ResponseUserType;
};

const PostDetail = ({ user }: PostDetailProps) => {
  const { id } = useParams();
  // const { data: post } = usePostQuery(id as string, true);
  const { data: post, isLoading } = useReqPostDataById(id as string);
  const navigate = useNavigate();
  
  return (
    <MtContainer >
      <Banner>
        <MainTitle>{ !isLoading ? post.result.title : "Loading..." }</MainTitle>
      </Banner>
      {
        post && (
          <Container className="position-relative">
            <MDEditor.Markdown
            source={post.result.body} 
            style={{
              marginTop: "1rem",
              whiteSpace: 'pre-wrap', 
              minHeight: "300px", 
              borderRadius: "5px", 
              padding: "4rem 1rem",
              background: "var(--white)",
              color: "var(--purple)"
            }}
          />
          {
            (user && user.role === "admin") && (
              <Iconbutton
                style={{ position: "absolute", top: "1rem", right: "1.5rem" }}
                onClick={() => navigate(`/write/${post.result.id}`, { state: post.result })}
              >
                <FileEditIcon />
              </Iconbutton>
            )
          }
          </Container>
        )
      }
      <Iconbutton 
        style={{ position: "fixed", bottom: "2rem", left: "1.5rem" }}
        onClick={() => navigate(-1)}
      >
        <Undo2Icon />
      </Iconbutton>
    </MtContainer>
  )
};

export default PostDetail;