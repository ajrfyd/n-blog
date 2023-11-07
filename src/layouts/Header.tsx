import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {


  return (
    <>
      <Block>
        <Inner>
          <HomeButton to="/">
            <h2>
              Klog
            </h2>
          </HomeButton>
        </Inner>
      </Block>
      <Wall />
    </>
  );
};

export default Header;

const Block = styled.div`
  height: 4rem;
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
`

const Inner = styled.div`
  width: 100%;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1919px) {
    width: 1376px;
  }

  @media (max-width: 1440px) {
    width: 1024px;
  }

  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
  
`;

const HomeButton = styled(Link)`
  color: #000000ac;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;

  h2 {
    font-size: 2.5rem;
  }

  &:hover {
    color: #393939;
  }
`; 

const Wall = styled.div`
  height: 4rem;
`