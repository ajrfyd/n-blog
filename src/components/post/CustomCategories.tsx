import { useEffect, useRef, useState, useCallback } from "react";
import { ServerTagType, TagType } from "../../ types/postTypes";
import styled from "styled-components";
import ArrowButton from "../buttons/ArrowButton";
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon } from "lucide-react";
import Tag from "./Tag";

type CategoriesProps = {
  tags: ServerTagType[];
  tagSearchHandler: (tag: TagType) => void;
};

const CustomCategories = ({ tags, tagSearchHandler }: CategoriesProps) => {
  const [tagPosition, setTagPosition] = useState(0);
  // const [edge, setEdge] = useState(0);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLUListElement>(null);
  const edgeRef = useRef(0);
  const stepRef = useRef(0);

  const moveRightHandler = () => {
    if(-edgeRef.current >= tagPosition) {
      setTagPosition(-edgeRef.current);
      return;
    };

    // setTagPosition(prev => prev - 50);
    setTagPosition(prev => prev - stepRef.current);
  };

  const moveLeftHandler = () => {
    if(tagPosition >= 0) {
      setTagPosition(0);
      return;
    }

    setTagPosition(prev => prev + stepRef.current);
  };

  const translateTagHandler = useCallback((id: string) => {
    const selectedTag = tags.filter((oTag) => oTag.id === id).map((tag) => ({ value: tag.id, label: tag.label }));
    tagSearchHandler(selectedTag[0]);
  }, []);

  useEffect(() => {
    if(!sliderContainerRef.current || !sliderRef.current) return;
    const { clientWidth } = sliderContainerRef.current;
    const { scrollWidth } = sliderRef.current;
    
    //* 태그 이동 거리 계산
    stepRef.current = clientWidth / 2;
    
    //* 태그 컨테이너의 끝을 계산
    edgeRef.current = scrollWidth - clientWidth;
  }, []);

  return (
    <Container>
      <ArrowButton onClick={moveLeftHandler}>
        <ArrowBigLeftDashIcon />
      </ArrowButton>
      <TabContainer ref={sliderContainerRef}>
        <TabSlider
          ref={sliderRef}
          style={{
            transform: `translateX(${tagPosition}px)`
            // transform: `translateX(-${testRef.current})`
          }}
        >
          {/* {
            tags.map((tag) => (
              <Tag 
                key={tag.id} 
                title={tag.label}
                onClick={() => {
                  const selectedTag = tags.filter((oTag) => oTag.id === tag.id).map((tag) => ({ value: tag.id, label: tag.label }));
                  tagSearchHandler(selectedTag[0]);
                }}
              >
                {tag.label}
              </Tag>
            ))
          } */}
          {
            tags.map(tag => <Tag title={tag.label} key={tag.id} onClick={() => translateTagHandler(tag.id)}/>)
          }
        </TabSlider>
      </TabContainer>
      <ArrowButton onClick={moveRightHandler}> 
        <ArrowBigRightDashIcon />
      </ArrowButton>
    </Container>
  );
};

export default CustomCategories;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding: 0 2rem;

`;

const TabContainer = styled.div`
  overflow: hidden;
  
  flex: 1;
  /* justify-content: center; */
  /* align-items: center; */
`;

const TabSlider = styled.ul`
  display: flex;
  padding-left: 0;
  transition: .2s;
  transition-delay: .1s;
`;