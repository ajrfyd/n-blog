import { ServerTagType, TagType } from "../../ types/postTypes";
import styled from "styled-components";
import Iconbutton from "../buttons/IconButton";
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon } from "lucide-react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

type CategoriesProps = {
  tags: ServerTagType[];
  tagSearchHandler: (tag: TagType) => void;
};

const Categories = ({ tags, tagSearchHandler }: CategoriesProps) => {

  const moveHandler = (to: "left" | "right") => {
    console.log(to);
  };

  const num = 0;

  return (
    <Container>
      <Iconbutton onClick={() => moveHandler("left")}>
        <ArrowBigLeftDashIcon />
      </Iconbutton>
      <TabContainer>
        <Tabs
          variant="pills"
          id="sel-tag"
          transition
          justify
          defaultActiveKey={tags.filter(tag => tag.label === "All")[0].label}
          onSelect={(id) => {
            const tag = tags
              .filter((tag) => tag.id === id)
              .map((tag) => ({ value: tag.id, label: tag.label }));
            tagSearchHandler(tag[0]);
          }}
          style={{
            flexWrap: "nowrap",
            transform: `translateX(-${num}px)`
          }}
        >
          {tags.map((tag) => (
            <Tab key={tag.id} transition title={tag.label} eventKey={tag.id}>
              {tag.label}
            </Tab>
          ))}
        </Tabs>
      </TabContainer>

      <Iconbutton onClick={() => moveHandler("right")}>
        <ArrowBigRightDashIcon />
      </Iconbutton>
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  display: flex;
  margin-top: 5px;
  padding: 0 2rem;

`;

const TabContainer = styled.div`
  overflow: hidden;
  /* border: 2px solid red; */

  .tab-content {
    display: none;
  }
`;
