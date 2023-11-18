import styled from "styled-components";
import ReactSelect from "react-select";
import SearchInput from "../components/SearchInput";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePostsData } from "../lib/hooks/useStore";
import { setTagsOption } from "../lib/utils";
import { Tags } from "../ types/postTypes";

type SearchSectionProps = React.InputHTMLAttributes<HTMLInputElement> & {
  $hasMargin?: boolean;
};

//Todo 태그 리스트 받아서 뿌려주기
//Todo 선택한 태그에 관련된 포스트 뿌리기

const SearchLayout = ({ $hasMargin }: SearchSectionProps) => {
  let { pathname, state } = useLocation();
  const [location, setLocation] = useState("posts");
  const localTags = usePostsData("tags") as Tags[];

  useEffect(() => {
    pathname === "/posts" ? null : setLocation(pathname);
  }, []);
  // return (
  //   <SearchSectionContainer $hasMargin={$hasMargin}>
  //     {
  //       location === "posts" ? (
  //         <>
  //           <div style={{ display: "flex", flexDirection: "column", flex: 2, gap: "10px"}}>
  //             <label htmlFor="">제목 검색</label>
  //             <SearchInput placeholder="제목 검색"/>
  //           </div>
  //           <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
  //             <label htmlFor="">Tag 검색</label>
  //             <SelectInput placeholder="Tag 검색" isMulti/>
  //           </div>
  //         </>
  //       ) : (
  //         <>
  //           <div style={{ display: "flex", flexDirection: "column", flex: 2, gap: "10px"}}>
  //             {/* <label htmlFor="">제목 검색</label> */}
  //             {/* <input type="text" placeholder="제목 검색" style={{ backgroundColor: "hsl(0, 0%, 100%)", paddingLeft: "1rem", borderStyle: "solid", height: "100%", borderColor: "hsl(0, 0%, 80%)", borderRadius: "5px" }}/> */}
  //             <SearchInput placeholder="제목" />
  //           </div>
  //           <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
  //             {/* <label htmlFor="">Tag 검색</label> */}
  //             <SelectInput placeholder="Tags" isMulti/>
  //           </div>
  //         </>
  //       )
  //     }
  //   </SearchSectionContainer>
  // )
  return (
    <SearchSectionContainer $hasMargin={$hasMargin}>
      <div style={{ display: "flex", flexDirection: "column", flex: 2, gap: "10px"}}>
        {
          location === "posts" ? <label htmlFor="">제목 검색</label> : null
        }
        <SearchInput placeholder={`${location === 'posts' ? "제목 검색" : ""}`} value={`${state ? state.title : "" }`}/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
        {
          location === "posts" ? <label htmlFor="">Tag 검색</label> : null
        }
        <SelectInput 
          placeholder={`${location === "posts" ? "Tag 검색" : "Tag"}`}
          // value={state ? state.tags : null}
          options={
            state ? setTagsOption(state.tags)
            : localTags.map(tag => ({ value: tag.id, label: tag.label }))
          }
          isMulti={localTags ? false : true}
        />
      </div>
    </SearchSectionContainer>
  )
}

export default SearchLayout;

const SearchSectionContainer = styled.section<Pick<SearchSectionProps, "$hasMargin">>`
  display: flex;
  gap: 1rem;

  padding-bottom: 10px;
  margin-bottom: ${({ $hasMargin }) => $hasMargin ? "1rem" : "" };

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SelectInput = styled(ReactSelect).attrs({
  classNamePrefix: 'react-select'
})`
  flex: 1;
  .react-select__control {
    /* background-color: #fa5938; */
    /* width: 100px; */
    /* height: 40px; */
    /* padding-right: 15px; */
    /* border: none; */
    /* border-radius: 20px; */
    /* display: flex; */
    /* text-align: center; */
    cursor: pointer;
  }

  .react-select__menu {
    /* color: var(--purple); */
    /* font-weight: 600; */
  }

  .react-select__option {
    background-color: transparent; /* option 배경색 */
    color: var(--purple); /* option 텍스트 색상 */
  }

  .react-select__option--is-selected {
    /* selected */
    background-color: var(--teal);
  }

  .react-select__option--is-focused {
    color: var(--teal); 
    /* hover */
  }

  /* .react-select__single-value {
    color: red;
    font-weight: 700;
  } */
`;