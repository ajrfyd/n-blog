import React, { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { oauthApi } from "./lib/api/api";
import { useDispatch } from "react-redux";
import { notify } from "./stroe/notify";
// import Header from "./layouts/Header";
import Main from "./pages/Main";
// import PostsMain from "./pages/PostsMain";
// import BackDrop from './components/BackDrop';
import PostPage from "./pages/PostPage";
// import PostLayout from "./layouts/PostLayout";
import Notification from './components/notification/Notification';
// import Post from "./components/Post";
import Loading from "./components/page/Loading";
import NotFound from "./components/page/NotFound";
import useUserState from "./lib/hooks/useLogin";
import { PenToolIcon } from "lucide-react";
import CustomButton from './components/buttons/CustomButton';
import NavBar from "./components/nav/Navbar";
import PostListPage from "./pages/PostListPage";
import PostDetail from "./components/post/PostDetail";
import Error from "./components/page/Error";

const App = () => {
  const [user, setUser] = useUserState();
  let { search } = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const logInHandler = () => location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GH_ID}`;
  
  const logOutHandler = () => {
    localStorage.setItem("userState", "null");
    setUser(null);
  };

  const reqLogin = async (code: string) => {
    const { data } = await oauthApi({
      method: 'post',
      url: `auth`,
      headers: {
        accept: 'application/json',
      },
      data: {
        clientId: import.meta.env.VITE_GH_ID,
        // client_secret: import.meta.env.VITE_GH_SECRET,
        code
      }
    });

    setUser({ name: data.userId, role: data.userId === "ajrfyd" ? "admin" : "user" });
    dispatch(notify(`${data.userId}님 환영합니다. (role: ${data.userId === "ajrfyd" ? "admin" : "user"})`));
  };

  useEffect(() => {
    if(search === "") return;
    const code = new URL(location.href).searchParams.get("code") as string;
    reqLogin(code);
    history.replaceState({}, "", location.pathname);
  }, [search]);

  return (
    <React.Fragment>
      <Suspense fallback={<Loading />}>
      {/* <Header /> */}
      <NavBar
        user={user}
        logInHandler={logInHandler}
        logOutHandler={logOutHandler}
      />
      <Routes>
        <Route path="/" element={<Main />}/>
        {/* <Route path="/posts" element={<PostsMain />}/> */}
        <Route path="/posts" element={<PostListPage />}/>
        <Route path="/post/:id" element={<PostDetail/>}/>
        <Route path="/write" element={<PostPage />}/>
        <Route path="/error" element={<Error/>} />
        <Route path="*" element={< NotFound/>}/>
      </Routes>
      <Notification />
      {
        (user && (user.name === "ajrfyd" && user.role === 'admin')) && (
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
      }
      </Suspense>
      {/* <BackDrop>children</BackDrop>  */}
    </React.Fragment>
  )
};

export default App;

