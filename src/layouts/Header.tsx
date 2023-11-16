import styled from "styled-components";
import { Link } from "react-router-dom";
import CustomButton from '../components/CustomButton';
import IconMenu from "./IconMenu";
import { BookOpenText, View, DoorOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notify } from "../stroe/notify";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const navNoticeHandler = (msg: string) => {
    dispatch(notify(msg));
    navigation("/blogList");
  };

  return (
    <>
      <Block>
        <Inner>
          <HomeButton to="/">
            <h2 style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, .4)"}}>
              Klog
            </h2>
          </HomeButton>
          <IconMenu>
            <CustomButton 
              $isIcon 
              // onClick={() => nav("/blogList")}
              onClick={() => navNoticeHandler("블로그 페이지 입니다.")}
            >
              <BookOpenText />
            </CustomButton>
            <CustomButton 
              $isIcon 
              onClick={() => dispatch(notify("갤러리 준비중 입니다."))}
            >
                <View />
            </CustomButton>
            <CustomButton $isIcon onClick={() => dispatch(notify("로그인 준비중입니다."))}>
              <DoorOpen />
            </CustomButton>
          </IconMenu>
        </Inner>
      </Block>
      <Wall />
    </>
  );
};

export default Header;

const Block = styled.div`
  height: 5rem;
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  z-index: 10;

  background: ${({ theme }) => theme.themes.color.brown};
`

const Inner = styled.div`
  width: calc(100% - 6rem);
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1440px) {
    width: calc(100% - 5rem);
  }

  @media (max-width: 1200px) {
    width: calc(100% - 4rem);
  }

  @media (max-width: 768px) {
    width: calc(100% - 3rem);
  }
  
`;

const HomeButton = styled(Link)`
  /* color: ${({ theme }) => theme.themes.text.default}; */
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
  height: 5rem;
`