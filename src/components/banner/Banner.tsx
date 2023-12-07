import styled from "styled-components";
import { ChildrenProp } from "../../ types/propsTypes";

type BannerProps = ChildrenProp & {};

const Banner = ({ children }: BannerProps) => {

  return (
    <BannerSection>
      { children }
    </BannerSection>
  )
}

export default Banner;

const BannerSection = styled.section`
  width: 100%;
  height: 300px;
  background-color: var(--teal);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* margin-top: 5.4rem; */
  /* margin-top: 86px; */
`;
