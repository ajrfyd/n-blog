// import { useEffect, useState } from 'react';
import styled from "styled-components";
import { UserStateType } from "../../types";
import { useDispatch } from "react-redux";
import { notify } from "../../stroe/notify";
// import { oauthApi } from '../../lib/api/api';
import Container from "react-bootstrap/Container";
// import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from "react-bootstrap/Offcanvas";
import Logo from "./Logo";
import Iconbutton from "../buttons/IconButton";
import { GithubIcon, UnplugIcon } from "lucide-react";
import NavMenuItem from "./NavMenuItem";

type NavBarProps = {
  logInHandler: () => void;
  logOutHandler: () => void;
  user: UserStateType | null;
};

const NavBar = ({ logInHandler, logOutHandler, user }: NavBarProps) => {
  const dispatch = useDispatch();
  // const [user, setUser] = useState<UserStateType | null>(null);

  // const reqLogin = async (code: string) => {
  //   const { data } = await oauthApi({
  //     method: 'post',
  //     url: `auth`,
  //     headers: {
  //       accept: 'application/json',
  //     },
  //     data: {
  //       clientId: import.meta.env.VITE_GH_ID,
  //       // client_secret: import.meta.env.VITE_GH_SECRET,
  //       code
  //     }
  //   });

  //   setUser({ name: data.userId, role: data.userId === "ajrfyd" ? "admin" : "user" });
  //   dispatch(notify(`${data.userId}님 환영합니다. (role: ${data.userId === "ajrfyd" ? "admin" : "user"})`));
  // };

  // const logOutHandler = () => {
  //   localStorage.setItem("userState", "null");
  //   setUser(null);
  // };

  // useEffect(() => {
  //   const userState = localStorage.getItem("userState");
  //   if(userState) setUser(JSON.parse(userState));
  // }, []);

  return (
    <NavContainer className="mb-3" expand={"md"} fixed="top">
      <Container>
        <Logo />
        {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
        <Navbar.Toggle aria-controls={"offcanvasNavbar-expand}"} />
        <Navbar.Offcanvas
          id={"offcanvasNavbar-expand}"}
          aria-labelledby={"offcanvasNavbarLabel-expand}"}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={"offcanvasNavbarLabel-expand-}"}>
              klog
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* <Nav.Link href="#action1">Posts</Nav.Link> */}
              <NavMenuItem
                to="/"
                onClick={() => dispatch(notify("블로그 페이지 입니다."))}
              >
                Posts
              </NavMenuItem>
              {/* <NavMenuItem onClick={() => dispatch(notify("준비중 입니다."))}>Photos</NavMenuItem>
              <NavMenuItem onClick={() => dispatch(notify("준비중 입니다."))}>Sample</NavMenuItem> */}

              {/* <NavDropdown
                title="Dropdown"
                id={'offcanvasNavbarDropdown-expand}'}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
              <BtnContainer>
                <Iconbutton>
                  {user ? (
                    <UnplugIcon onClick={logOutHandler} />
                  ) : (
                    <GithubIcon onClick={logInHandler} />
                  )}
                </Iconbutton>
              </BtnContainer>
              {/* <Iconbutton
                onClick={modeHandler}
              >
                <Sun />
              </Iconbutton> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled(Navbar)`
  background: var(--brown);
`;

const BtnContainer = styled.div`
  margin: 0 1rem;
`;
