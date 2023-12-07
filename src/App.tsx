import React, { Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import Header from "./layouts/Header";
import Main from "./pages/Main";
// import PostsMain from "./pages/PostsMain";
// import BackDrop from './components/BackDrop';
import PostLayout from "./layouts/PostLayout";
import Notification from './layouts/Notification';
// import Post from "./components/Post";
import Loading from "./components/Loading";
import NotFound from "./pages/NotFound";
import useUserState from "./lib/hooks/useLogin";
import { PenToolIcon } from "lucide-react";
import CustomButton from './components/CustomButton';
import NavBar from "./components/nav/Navbar";
import PostListPage from "./pages/PostListPage";
import PostDetail from "./components/post/PostDetail";

const App = () => {
  const [user] = useUserState();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Suspense fallback={<Loading />}>
      {/* <Header /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />}/>
        {/* <Route path="/posts" element={<PostsMain />}/> */}
        <Route path="/posts" element={<PostListPage />}/>
        {/* <Route path="/post/:id" element={<Post/>}/> */}
        <Route path="/post/:id" element={<PostDetail/>}/>
        <Route path="/write" element={<PostLayout />}/>
        <Route path="*" element={< NotFound/>}/>
      </Routes>
      <Notification />
      {
        (user && (user.name === "ajrfyd" && user.role === 'admin')) && (
          <div style={{ position: "fixed", right: "2rem", bottom: "2rem" }}>
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

