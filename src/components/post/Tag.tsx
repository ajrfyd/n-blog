import React from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";

type TagProps = {
  // key: string;
  title: string;
  onClick: () => void;
}

// const Tag = ({ title, onClick }: TagProps) => <TagContainer onClick={onClick}>{title}</TagContainer>;
const Tag = ({ title, onClick }: TagProps) => {
  return <TagContainer onClick={onClick}>{title}</TagContainer>;
};

export default React.memo(Tag);
// export default Tag;


const TagContainer = styled.li`
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  padding: .3rem 1rem;
  border-radius: 7px;
  color: ${({ theme }) => theme ? darken(0.2, theme.themes.color.purple) : "var(--white)"};
  /* color: var(--white); */
  /* background-color: var(--purple); */

  .active {
    background: var(--teal);
  }

  &:hover {
    color: ${({ theme }) => theme ? lighten(0.1, theme.themes.color.purple) : "var(--white)"};
  }

  & + & {
    margin-left: 1rem;
  }
`;