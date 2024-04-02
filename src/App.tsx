import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { reqOauth } from "./lib/api/api";
import { useDispatch } from "react-redux";
import { notify } from "./stroe/notify";
// import Header from "./layouts/Header";
import Main from "./pages/Main";
// import PostsMain from "./pages/PostsMain";
// import BackDrop from './components/BackDrop';
import PostPage from "./pages/PostPage";
// import PostLayout from "./layouts/PostLayout";
import Notification from "./components/notification/Notification";
// import Post from "./components/Post";
import Loading from "./components/page/Loading";
import NotFound from "./components/page/NotFound";
import useUserState from "./lib/hooks/useLogin";
import NavBar from "./components/nav/Navbar";
import PostListPage from "./pages/PostListPage";
import PostDetail from "./components/post/PostDetail";
import Post from "./pages/Post";
import Error from "./components/page/Error";
import Seo from "./components/helmet/Seo";
import { ResponseUserType } from "./types";

const App = () => {
  const [user, setUser] = useUserState();
  let { search, pathname } = useLocation();
  const dispatch = useDispatch();

  const logInHandler = () =>
    (location.href = `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_GH_ID
    }`);

  const logOutHandler = () => {
    localStorage.setItem("userState", "null");
    setUser(null);
  };

  const reqLogin = async (code: string) => {
    const { result } = await reqOauth<ResponseUserType>(code);

    setUser({
      name: result.name.length >= 1 ? result.name : result.id,
      role: result.id === "ajrfyd" ? "admin" : "user",
      id: result.id,
      access_token: result.access_token,
    });
    dispatch(
      notify(
        `${
          result.name.length >= 1 ? result.name : result.id
        }님 환영합니다. (role: ${result.id === "ajrfyd" ? "admin" : "user"})`
      )
    );
  };

  useEffect(() => {
    if (search === "") return;
    const code = new URL(location.href).searchParams.get("code") as string;
    reqLogin(code);
    history.replaceState({}, "", location.pathname);
  }, [search]);

  useEffect(() => {
    if (
      document.querySelector(
        "script[src='https://cdn.hkound.pe.kr/js/main.bundle.js']"
      )
    )
      return;
    const sc = document.createElement("script");
    sc.src = "https://cdn.hkound.pe.kr/js/main.bundle.js";
    sc.async = true;
    sc.type = "module";
    document.body.appendChild(sc);
  }, []);

  return (
    <React.Fragment>
      <Seo
        title="Welcome to hk's blog"
        desc="2년차 개발자의 개인 블로그입니다."
        url={pathname}
        imgUrl="/javascript.jpg"
        site_name="hk's blog"
      />
      <Suspense fallback={<Loading />}>
        {/* <Header /> */}
        <NavBar
          user={user}
          logInHandler={logInHandler}
          logOutHandler={logOutHandler}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/posts" element={<PostsMain />}/> */}
          <Route path="/posts" element={<PostListPage user={user} />} />
          <Route path="/post/:id" element={<PostDetail user={user} />} />
          <Route path="/write" element={<PostPage />} />
          <Route path="/write/:id" element={<PostPage />} />
          <Route path="/writet" element={<Post />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Notification />
        {/* {
        (user && (user.id === "ajrfyd" && user.role === 'admin')) && (
          <div 
            style={{ 
              position: "fixed", 
              right: "2rem", 
              bottom: "2rem",
              zIndex: 10
            }}
          >
            <CustomButton 
              $isIcon
              onClick={() => navigate("/write")}
            >
              <PenToolIcon />
            </CustomButton>
          </div>
        )
      } */}
      </Suspense>
      {/* <BackDrop>children</BackDrop>  */}
    </React.Fragment>
  );
};

export default App;
